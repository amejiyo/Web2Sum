
**Setup**
```python
from collections import OrderedDict
import numpy as np
import bisect

# Thai sentence segmentation
from thai_segmenter import sentence_segment

# Thai word tokenization
import spacy_thai

class TextRank():
  ...
  ...
  
textrank = TextRank()
```

**Usage**
```python
paragraph:str = '''input paragraph'''
```

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



