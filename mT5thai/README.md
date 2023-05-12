
## Installation


```bash
pip install --no-cache-dir transformers sentencepiece simpletransformers==0.63.4 tqdm pandas numpy html
```
    
## Usage/Examples

Table of content

- A) Get Summarized output
- B) Get Summarized output + Attention score



### A. Get Summarized output
According to *Method 1: mT5 on hugging face* (using pipeline)

```python
from transformers import pipeline
```

```python
# Load model
summarizer = pipeline("summarization", model="thanathorn/mt5-cpe-kmutt-thai-sentence-sum")
```

```python
# Example input
inputs = '''แนวโน้มของการใช้หุ่นยนต์ทางด้านการผลิตและงานบริการมีจำนวนสูงขึ้นมากกว่า 30% ทุกปี แต่ประเทศไทยยังขาดบุคลากรด้านวิทยาการหุ่นยนต์และระบบอัตโนมัติในทุกระดับ 
โดยเฉพาะอาชีพวิศวกร อาจารย์และนักวิจัย ฟีโบ้จึงได้รับการก่อตั้งขึ้น ในปี 2538 โดย รศ. ดร.ชิต เหล่าวัฒนา และฟีโบ้มีคติพจน์ว่า “A Cradle of Future Leaders in Robotics” ที่มุ่งสร้างผู้นำด้านวิทยาการหุ่นยนต์ของไทย
ฟีโบ้เป็นสถาบันระดับคณะแห่งแรกและแห่งเดียวในไทยที่เปิดสอนและให้ปริญญาครบทั้งระดับปริญญาตรี ปริญญาโท และปริญญาเอก ในสาขาวิทยาการหุ่นยนต์และระบบอัตโนมัติ ทุกหลักสูตรเน้นหลัก 
Outcome-based Education ที่บัณฑิตสามารถใช้สมรรถนะที่เรียนในการพัฒนาเทคโนโลยีหุ่นยนต์ขึ้นได้ ทำให้บัณฑิตฟีโบ้เป็นที่ต้องการของภาคเอกชนและภาครัฐอย่างมาก นอกจากนี้ฟีโบ้มีผลงานวิจัยพัฒนาและให้บริการวิชาการด้านหุ่นยนต์เพื่อการผลิตและเพื่อพัฒนาคุณภาพชีวิตมากกว่า 300 ระบบ 
โดยมีความร่วมมือที่แข็งแกร่งกับภาครัฐและภาคธุรกิจอุตสาหกรรมชั้นนำ ทั้งกลุ่มปิโตรเลียม อาหาร ฮาร์ดดิสก์ การผลิตไฟฟ้า การขนส่ง ธุรกิจบริการ การศึกษา การแพทย์และการฟื้นฟูสมรรถภาพ
ปัจจุบัน ฟีโบ้ โดยการนำของ รศ. ดร.สยาม เจริญเสียง ผู้อำนวยการสถาบันฯ มุ่งมั่นเพื่อยกระดับฟีโบ้เข้าสู่สถาบันชั้นนำระดับอาเซียนทางด้านวิทยาการหุ่นยนต์ รวมทั้งสร้างเครือข่ายพัฒนาหลักสูตรด้านหุ่นยนต์ ครูและนักเรียนของโรงเรียนทั่วประเทศมากกว่า 100 โรงเรียน'''

# Config
min_length = 50   # Edit here to get shorter/longer output sequence
max_length = 100  # Edit here to get shorter/longer output sequence

# Summarization pipeline
output = summarizer( inputs, min_length=min, max_length=max, do_sample=True, num_beams=2)[0]['summary_text']
```

Testing
```bash
>>> print( type(output), output )

<class 'str'> ฟีโบ้เป็นสถาบันระดับคณะแห่งแรกและแห่งเดียวในไทยที่เปิดสอนและให้ปริญญาครบทั้งระดับปริญญาตรี โท โท และเอก ในสาขาวิทยาการหุ่นยนต์และระบบอัตโนมัติ มีการสนับสนุนจากภาคเอกชนและภาคเอกชนหลายระดับ
```


### B. Get Summarized output + Attention score
According to *Method 1A: Custom TFAutoModelForSeq2SeqLM* (using AutoModel)

```python
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM
```

```python
# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("thanathorn/mt5-cpe-kmutt-thai-sentence-sum")


# Load model
summarizer = TFAutoModelForSeq2SeqLM.from_pretrained("thanathorn/mt5-cpe-kmutt-thai-sentence-sum", 
    output_attentions=True,
    output_scores=True,
    from_pt=True,
)
```

```python
# Example input
inputs = '''แนวโน้มของการใช้หุ่นยนต์ทางด้านการผลิตและงานบริการมีจำนวนสูงขึ้นมากกว่า 30% ทุกปี แต่ประเทศไทยยังขาดบุคลากรด้านวิทยาการหุ่นยนต์และระบบอัตโนมัติในทุกระดับ 
โดยเฉพาะอาชีพวิศวกร อาจารย์และนักวิจัย ฟีโบ้จึงได้รับการก่อตั้งขึ้น ในปี 2538 โดย รศ. ดร.ชิต เหล่าวัฒนา และฟีโบ้มีคติพจน์ว่า “A Cradle of Future Leaders in Robotics” ที่มุ่งสร้างผู้นำด้านวิทยาการหุ่นยนต์ของไทย
ฟีโบ้เป็นสถาบันระดับคณะแห่งแรกและแห่งเดียวในไทยที่เปิดสอนและให้ปริญญาครบทั้งระดับปริญญาตรี ปริญญาโท และปริญญาเอก ในสาขาวิทยาการหุ่นยนต์และระบบอัตโนมัติ ทุกหลักสูตรเน้นหลัก 
Outcome-based Education ที่บัณฑิตสามารถใช้สมรรถนะที่เรียนในการพัฒนาเทคโนโลยีหุ่นยนต์ขึ้นได้ ทำให้บัณฑิตฟีโบ้เป็นที่ต้องการของภาคเอกชนและภาครัฐอย่างมาก นอกจากนี้ฟีโบ้มีผลงานวิจัยพัฒนาและให้บริการวิชาการด้านหุ่นยนต์เพื่อการผลิตและเพื่อพัฒนาคุณภาพชีวิตมากกว่า 300 ระบบ 
โดยมีความร่วมมือที่แข็งแกร่งกับภาครัฐและภาคธุรกิจอุตสาหกรรมชั้นนำ ทั้งกลุ่มปิโตรเลียม อาหาร ฮาร์ดดิสก์ การผลิตไฟฟ้า การขนส่ง ธุรกิจบริการ การศึกษา การแพทย์และการฟื้นฟูสมรรถภาพ
ปัจจุบัน ฟีโบ้ โดยการนำของ รศ. ดร.สยาม เจริญเสียง ผู้อำนวยการสถาบันฯ มุ่งมั่นเพื่อยกระดับฟีโบ้เข้าสู่สถาบันชั้นนำระดับอาเซียนทางด้านวิทยาการหุ่นยนต์ รวมทั้งสร้างเครือข่ายพัฒนาหลักสูตรด้านหุ่นยนต์ ครูและนักเรียนของโรงเรียนทั่วประเทศมากกว่า 100 โรงเรียน'''

inputs = tokenizer(inputs, return_tensors="pt").input_ids

# Config
min_length = 50   # Edit here to get shorter/longer output sequence
max_length = 100  # Edit here to get shorter/longer output sequence

# Summarization pipeline
outputs = model.generate(inputs, 

    # Parameters that control the length of the output
    min_length=min_length, max_length=max_length, max_new_tokens=max_length, 

    # Parameters that control the generation strategy used
    do_sample=True, num_beams=2,

    # Parameters that define the output variables of `generate`
    output_attentions=True, output_scores=True, return_dict_in_generate=True,
)

output = tokenizer.decode(outputs.sequences[0], skip_special_tokens=True)
attention = outputs.encoder_attentions
```

Testing
```bash
>>> print( type(output), output )

<class 'str'> ฟีโบ้เป็นสถาบันระดับคณะแห่งแรกและแห่งเดียวในไทยที่เปิดสอนและให้ปริญญาครบทั้งระดับปริญญาตรี โท โท และเอก ในสาขาวิทยาการหุ่นยนต์และระบบอัตโนมัติ มีการสนับสนุนจากภาคเอกชนและภาคเอกชนหลายระดับ

>>> print( type(attention), len(attention), attention[0].shape )

<class 'tuple'> 12 (1, 12, 316, 316)
```

### C. Highlight & export as *.html* format 

According to *Highlight Text using Weights* (using pipeline)

```python
import pandas as pd
import numpy as np
import html
from IPython.core.display import display, HTML

# Prevent special characters like & and < to cause the browser to display something other than what you intended.
def html_escape(text):
    return html.escape(text)

# Highlight & export function
def highlightedText(tokens, attention, encoder1: int=0, encoder2: int=0, pad='', max_alpha=0.6, save_html=False) -> list:
    '''
    https://adataanalyst.com/machine-learning/highlight-text-using-weights/
    '''
    highlighted_text = []
    for i, word in enumerate(tokens):
        if word=='▁': word = ' ' # change space '▁' to ' '
        if '▁' in word: word = word.replace('▁', ' ')
        if '▁' in word: print(word)

        df_sumcol = pd.DataFrame(attention[encoder1][0][encoder2]).sum(axis=0)
        weight = df_sumcol[i]
        
        if weight is not None:
            highlighted_text.append('' + html_escape(word) + '')
        else:
            highlighted_text.append(word)
    highlighted_text = pad.join(highlighted_text)

    display(HTML(highlighted_text))

    if save_html:
        html = HTML(highlighted_text).data
        # file name ex. attention_0_1.html
        with open(f'attention_{encoder1}_{encoder2}.html', 'w') as f:
            f.write(html)

    return highlighted_text
```


```python
# Load tokens
tokens = tokenizer.convert_ids_to_tokens(inputs[0])

# Load attention
attention = outputs.encoder_attentions

# Select encoder's attention here
encoder1 = 6
encoder2 = 0

# Highlight & export as *.html* format
highlighted_text = highlightedText(tokens, attention, encoder1, encoder2, save_html=True)

```

Testing
```bash
>>> print( type(highlighted_text), highlighted_text )

<class 'str'> '<span style="background-color:rgba(135,206,250,15.168177286783855);"> </span> <span style="background-color:rgba(135,206,250,0.12419788787762324);">แนวโน้ม</span> ...
```

