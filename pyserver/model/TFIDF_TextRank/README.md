
**Setup**
```python
from collections import OrderedDict
import numpy as np
import bisect
from sklearn.feature_extraction.text import TfidfVectorizer

# Thai sentence segmentation
from thai_segmenter import sentence_segment

# Thai word tokenization
import spacy_thai

class Base: 
  def get_longer(self):
      ...
  def get_shorter(self):
      ...
  def reset_min_length(self):
      ...
      
class TFIDF(Base):
  def tokenize(self, inputs):
    ...
  def summarize(self):
    ...
    
class TextRank(Base):
  def tokenize(self, inputs):
    ...
  ...
  def summarize(self):
    ...
  
tfidf = TFIDF()
#       TFIDF( method='avg' ) (Optional)

textrank = TextRank()
#          TextRank( method='avg' ) (Optional)
```

**Usage**
```python
paragraph:str = '''input paragraph'''
```

TF-IDF
```python
tfidf.tokenize(paragraph)
status, output, highlighted_text = tfidf.summarize()
```

```python
status, output, highlighted_text = tfidf.get_longer()
```
```python
status, output, highlighted_text = tfidf.get_shorter()
```

TextRank
```python
textrank.tokenize(paragraph)
status, output, highlighted_text = textrank.summarize()
                                 # textrank.summarize( window_size=4 ) (Optional: config window size)
```

```python
status, output, highlighted_text = textrank.get_longer()
```
```python
status, output, highlighted_text = textrank.get_shorter()
```



