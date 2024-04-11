from sklearn import preprocessing
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from pyvi import ViTokenizer
import re
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
import pickle
import nltk
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score
from sklearn.metrics import accuracy_score

data = pd.read_excel('data.xlsx')
X= data["question"]
Y= data["answer"]
# print("thuoc tinh dieu kien")
# print(X)
# print("thuoc tinh can du doan")
# print(Y)#

#Tiep theo chung ta se ma hoa Y sao cho no hop ly
le = preprocessing.LabelEncoder()
le.fit(Y)


list_label = list(le.classes_)

#print(list_label)
#print(len(list_label))

label = le.transform(Y)
#print(label)

def tienxuly(document): 
    document = ViTokenizer.tokenize(document)
    # đưa về lower
    document = document.lower()
    # xóa các ký tự không cần thiết
    document = re.sub(r'[^\s\wáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịúùủũụưứừửữựýỳỷỹỵđ_]',' ',document)
    # xóa khoảng trắng thừa
    document = re.sub(r'\s+', ' ', document).strip()
    return document
for i in range(0,X.count()):
  X[i] = tienxuly(X[i])
#print(X)

#chung ta se loai bo stop word trong van ban


#bay h dau tien minh muon biet cac stop word o dau va cho nao

#tokens = [t for t in text.split()]
tokens = []

for i in range(0,X.count()):
  for j in X[i].split():
    tokens.append(j)

#freq = nltk.FreqDist(tokens)
#freq.plot(20, cumulative=False)

#nhu vay chung ta biet mot so tu xuat hien xuat hien thuong xuyen va no se anh huong toi mo hinh can du doan
#chung ta se loai bo chung de cho model co do chinh xac cao hon

stopword = ["bot","ra"]
 
def remove_stopwords(line):
    words = []
    for word in line.strip().split():
        if word not in stopword:
            words.append(word)
    return ' '.join(words)

for i in range(0,X.count()):
  X[i]= remove_stopwords(X[i])

#buoc tiep theo chung ta se xay dung bo tu dien cho may hoc
vectorizer = CountVectorizer()

def transform(data):
  data= list(data)
  return vectorizer.fit_transform(data).todense()

data1 = transform(X)
#print(data1)
#chia du lieu ra lam 2 phan
X_train, X_test, Y_train, Y_test = train_test_split(data1, label, test_size=0.1, random_state=0)
#print(X_train)
#print(X_test)
#print(Y_train)
#print(Y_test)

X_test.shape

X_train1=np.asarray(X_train)
X_test1=np.asarray(X_test)
Y_train1=np.asarray(Y_train)
Y_test1=np.asarray(Y_test)
#khoi tao mo hinh
#chung ta se dung loai mo hinh multinomial Naive Bayes de phan loai

clf= MultinomialNB()
#scores = cross_val_score(clf, X_train1, Y_train1, cv=5)
#print("%0.2f  accuracy with a standard deviation of %0.2f" % (scores.mean()*100, scores.std()))

clf.fit(X_train1,Y_train1)

#kiem tra voi du lieu testing xem do chinh xac cua no la bao nhieu
prediction = clf.predict(X_test1)
#print("Độ chính xác so với dữ liệu dự đoán và dữ liệu test là: ")
#print(accuracy_score(Y_test1, prediction))

#bay h se luu file tu vung lai de dung cho sau nay

pickle.dump(vectorizer.vocabulary_, open('Colab\\vocab.pkl', 'wb')) #luu lai
pickle.dump(clf, open('Colab\\NB_ChatBot_model.pkl', 'wb')) #luu model lai
#luu cach ma hoa cua nhan lai
pickle.dump(le, open('Colab\\decode_label.pkl', 'wb'))