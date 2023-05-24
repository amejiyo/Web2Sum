from collections import OrderedDict
import numpy as np
import bisect
from sklearn.feature_extraction.text import TfidfVectorizer

# Thai sentence segmentation
from thai_segmenter import sentence_segment

# Thai word tokenization
import spacy_thai
from ..utils import highlightedText, Base

class TextRank(Base):
    def __init__(self, method='max'):
        self.name = "TextRank"
        super().__init__()  # Call the parent class constructor
        self.d = 0.85 # damping coefficient, usually is .85
        self.min_diff = 1e-5 # convergence threshold
        self.steps = 10 # iteration steps
        self.node_weight = None # save keywords and its weight

        self.method = method # {avg, max}

        self.segmenter = sentence_segment
        self.tokenizer = spacy_thai.load()
        self.tokens = None

        self.min_length = 50    # max_length = 2*self.min_lenght
    
    def tokenize(self, inputs):
        self.inputs = inputs
        self.prev_inputs = None
        self.tokens = self.tokenizer(inputs)
        return self.tokens

    def sentence_segment(self, doc, candidate_pos, lower):
        """Store those words only in cadidate_pos"""
        sentences = []
        for sent in doc.sents:
            selected_words = []
            for token in sent:
                # Store words only with cadidate POS tag
                if token.pos_ in candidate_pos and token.is_stop is False:
                    if lower is True:
                        selected_words.append(token.text.lower())
                    else:
                        selected_words.append(token.text)
            sentences.append(selected_words)
        return sentences
    def symmetrize(self, a):
        return a + a.T - np.diag(a.diagonal())
    def get_vocab(self, sentences):
        """Get all tokens"""
        vocab = OrderedDict()
        i = 0
        for sentence in sentences:
            for word in sentence:
                if word not in vocab:
                    vocab[word] = i
                    i += 1
        return vocab
    def get_token_pairs(self, window_size, sentences):
        """Build token_pairs from windows in sentences"""
        token_pairs = list()
        for sentence in sentences:
            for i, word in enumerate(sentence):
                for j in range(i+1, i+window_size):
                    if j >= len(sentence):
                        break
                    pair = (word, sentence[j])
                    if pair not in token_pairs:
                        token_pairs.append(pair)
        return token_pairs
    def get_matrix(self, vocab, token_pairs):
        """Get normalized matrix"""
        # Build matrix
        vocab_size = len(vocab)
        g = np.zeros((vocab_size, vocab_size), dtype='float')
        for word1, word2 in token_pairs:
            i, j = vocab[word1], vocab[word2]
            g[i][j] = 1
            
        # Get Symmeric matrix
        g = self.symmetrize(g)
        
        # Normalize matrix by column
        norm = np.sum(g, axis=0)
        g_norm = np.divide(g, norm, where=norm!=0) # this is ignore the 0 element in norm
        
        return g_norm

    def summarize(self, 
                candidate_pos=['NOUN', 'PROPN'], 
                window_size=4, lower=False, stopwords=list()):
        ''''
            feedback code:
                100: failed to generate output
                200: success
                300: failed to decode output
                400: failed to hightlighted input text
                500: input summarized length is underexpected
                600: inpit summarized length is overexpected        (not set yet)
        '''
        # --------------------------------------Calculation part--------------------------------------#
        try:
            if self.prev_inputs == None:
                # Filter sentences
                sentences = self.sentence_segment(self.tokens, candidate_pos, lower) # list of list of words
                # Build vocabulary
                vocab = self.get_vocab(sentences)
                # Get token_pairs from windows
                token_pairs = self.get_token_pairs(window_size, sentences)
                # Get normalized matrix
                g = self.get_matrix(vocab, token_pairs)
                # Initionlization for weight(pagerank value)
                pr = np.array([1] * len(vocab))
                # Iteration
                previous_pr = 0
                for epoch in range(self.steps):
                    pr = (1-self.d) + self.d * np.dot(g, pr)
                    if abs(previous_pr - sum(pr))  < self.min_diff:
                        break
                    else:
                        previous_pr = sum(pr)
                # Get weight for each node
                node_weight = dict()
                for word, index in vocab.items():
                    node_weight[word] = pr[index]
                self.node_weight = node_weight
        # --------------------------------------Getting sentence part--------------------------------------#
                self.sentences = self.segmenter( self.inputs )
                self.sentences_weight = []
                self.sentences_rank = []
                self.sentences_len = []

                for sentence in self.sentences:
                    if self.method == 'avg':
                    # Avg score method --------------------------------- 
                        score = []
                        tokens = self.tokenizer(str(sentence))
                        for token in tokens:
                            score.append(self.node_weight[ str(token) ] if str(token) in self.node_weight.keys() else 0.0)
                        self.sentences_weight.append( np.average(np.asarray(score)) )

                    elif self.method == 'max':
                    # Max score method --------------------------------- 
                        score = 0.0
                        tokens = self.tokenizer(str(sentence))
                        for token in tokens:
                            score += (self.node_weight[ str(token) ] if str(token) in self.node_weight.keys() else 0.0)
                        self.sentences_weight.append( score )
                    
                    else: print("Invalid method!")
                    
                    self.sentences_len.append( len(tokens) )
                self.sentences_rank = np.argsort(np.asarray(self.sentences_weight), axis=0)[::-1]

                self.prev_inputs = self.inputs
        except:
            return 100, self.feedback_code[100], -1

        # --------------------------------------Generating output part--------------------------------------#
        try:
            output = []
            current_len = 0; current_rank = []
            for rank in self.sentences_rank:
                to_insert = bisect.bisect_left(current_rank, rank)
                output.insert(
                    to_insert,
                    str(self.sentences[rank]),
                )
                current_rank.insert(to_insert, rank)
                current_len += self.sentences_len[rank]

                # print(current_rank); print(current_len); print(output)
                
                if current_len >= self.min_length: break
            output = ''.join(output)
        except:
            return 300, self.feedback_code[300], -1

        try:
            highlighted_text = highlightedText( list(self.tokens), self.node_weight)
        except:
            return 400, self.feedback_code[400], -1
        return 200, output, highlighted_text, self.min_length