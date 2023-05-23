from collections import OrderedDict
import numpy as np
import bisect
from sklearn.feature_extraction.text import TfidfVectorizer

# Thai sentence segmentation
from thai_segmenter import sentence_segment

# Thai word tokenization
import spacy_thai
from ..utils import highlightedText, Base

class TFIDF(Base):
    def __init__(self, method='max'):
        super().__init__()  # Call the parent class constructor
        self.name = "TF-IDF"
        self.segmenter = sentence_segment
        self.tokenizer = spacy_thai.load()
        self.tokens = None

        self.vectorizer = TfidfVectorizer(tokenizer=self.tokenizer)
        self.method = method # {avg, max}

        self.min_length = 50    # max_length = 2*self.min_lenght
    
    def tokenize(self, inputs):
        self.inputs = inputs
        self.prev_inputs = None
        sentences = self.segmenter(inputs)
        # convert type`thai_segmenter.sentence.sentence` to `str`
        self.sentences = [str(sentence) for sentence in sentences]

        self.tokens = self.tokenizer(inputs)
        return self.tokens

    def summarize(self):
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
                
                mat = self.vectorizer.fit_transform(self.sentences)
                # tokens = self.tokenizer( ' '.join(self.sentences) )

                # print(type(mat), mat.toarray(), mat.toarray().shape, np.average(mat.toarray(),axis=1).shape)

                sentence_weight = np.average(mat.toarray(),axis=1)
                word_weight     = mat.sum(axis=0).A1

                sentence_weight_norm = (sentence_weight-np.min(sentence_weight))/(np.max(sentence_weight)-np.min(sentence_weight))
                word_weight_norm     = (word_weight-np.min(word_weight))/(np.max(word_weight)-np.min(word_weight))

                self.node_weight = dict()
                for word, word_id in self.vectorizer.vocabulary_.items(): # replace word_id -> weight
                    if str(word) not in self.node_weight.keys(): 
                        self.node_weight[str(word)] = word_weight_norm[word_id]
                    else: # is already have?
                        self.node_weight[str(word)] = sum([self.node_weight[str(word)], word_weight_norm[word_id]]) / 2

        # --------------------------------------Getting sentence part--------------------------------------#

                self.sentences_weight = [] #sentence_weight
                self.sentences_rank = [] #np.argsort(sentence_weight, axis=0)[::-1]
                self.sentences_len = [] #[len(self.tokenizer(str(sentence))) for sentence in self.sentences]

                # Add-on for more sentence weight calculation
                # 
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
        return 200, output, highlighted_text