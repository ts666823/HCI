import json

import fastapi
import numpy
import pandas as pd
from flask import jsonify, Flask
from flask_cors import CORS

f = open('googleplaystore.csv')
df = pd.read_csv(f, keep_default_na=False, header=0, dtype=str, index_col=0)

# 去除不明确的种类和NaN
process_df = df[~df['Android Ver'].str.contains(pat=r'NaN', regex=True)]
process_df = process_df[~df['Category'].str.contains(pat=r'^[0-9]|NaN', regex=True)]
app = Flask(__name__)
CORS(app, supports_credentials = True)

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (numpy.int_, numpy.intc, numpy.intp, numpy.int8,
                            numpy.int16, numpy.int32, numpy.int64, numpy.uint8,
                            numpy.uint16, numpy.uint32, numpy.uint64)):
            return int(obj)
        elif isinstance(obj, (numpy.float_, numpy.float16, numpy.float32,
                              numpy.float64)):
            return float(obj)
        elif isinstance(obj, (numpy.ndarray,)):  # add this line
            return obj.tolist()  # add this line
        return json.JSONEncoder.default(self, obj)


def getVerCategoryInfo():
    # 提取除版本与种类
    ver_category_df = process_df.groupby(['Android Ver', 'Category'])['App'].nunique().reset_index()
    # print(df2)
    # 取出总数最多的10个
    categories = ver_category_df["Category"].value_counts().head(10).index
    ten_df = ver_category_df[ver_category_df['Category'].str.contains(pat=r"|".join(categories), regex=True)]
    stack_area_data = {'AndroidVer': ten_df['Android Ver'].unique().tolist(),
                       'Category': ten_df['Category'].unique().tolist()}
    for category in categories:
        # 找出种类符合的df
        temp = ten_df[ten_df['Category'] == category]
        stack_area_data[category] = []
        for i in stack_area_data['AndroidVer']:
            # 如果没有数据，标0
            if len(temp[temp['Android Ver'] == i]['App']) == 0:
                stack_area_data[category].append(0)
            # 有数据，填上相应数据
            else:
                stack_area_data[category].append(temp[temp['Android Ver'] == i]['App'].values[0])
    print(stack_area_data)
    return json.dumps(stack_area_data, cls=NpEncoder)


# key 可以是 Rating， Reviews， Installs
def getColumnData(key='Rating'):
    # 去除其中key为NaN的
    rm_rating_NaN_df = process_df[~process_df[key].str.contains(pat=r'NaN', regex=True)][['App', key, 'Category']]
    # 如果是Installs需要将其最后一个字符删除
    if key == 'Installs':
        rm_rating_NaN_df[key] = rm_rating_NaN_df[key].str[:-1]
        rm_rating_NaN_df[key] = rm_rating_NaN_df[key].str.replace(',', '')
    # Rating转换为float64类型
    rm_rating_NaN_df[key] = rm_rating_NaN_df[key].apply(pd.to_numeric)
    # 计算平均评分,得到平均评分前5的种类
    rating_categories = rm_rating_NaN_df.groupby('Category')[key].mean().sort_values(ascending=False).head(5).index
    # 求平均评分前5的种类中前4的App
    res_dict = {'First': [], 'Second': [], 'Third': [], 'Fourth': [], 'categories': [], 'x': ['First', 'Second', 'Third', 'Fourth']}
    for category in rating_categories:
        min =rm_rating_NaN_df[rm_rating_NaN_df['Category'] == category][key].min()
        a, b = pd.cut(rm_rating_NaN_df[rm_rating_NaN_df['Category'] == category][key], bins=3, retbins=True)
        print(min)
        print(b)
        # temp = \
        #     rm_rating_NaN_df[rm_rating_NaN_df['Category'] == category].sort_values(key, ascending=False).head(4)[
        #         key]
        for i in range(4):
            if b[i] < 0:
                res_dict[res_dict['x'][i]].append(round(0, 3))
            else:
                res_dict[res_dict['x'][i]].append(round(b[i], 3))
        res_dict['categories'].append(category)
        print(category)
    return json.dumps(res_dict, cls=NpEncoder)


def getCategories(num=10):
    rm_rating_NaN_df = process_df[~process_df['Rating'].str.contains(pat=r'NaN', regex=True)][
        ['App', 'Rating', 'Category']]
    rm_rating_NaN_df['Rating'] = rm_rating_NaN_df['Rating'].apply(pd.to_numeric)
    rating_categories = rm_rating_NaN_df.groupby('Category')['Rating'].mean().sort_values(ascending=False).head(
        num).index
    res_dict = {}
    res_dict['categories'] = rating_categories.values.tolist()
    print(res_dict)
    return jsonify(res_dict)


def getRating(catagory='EVENTS', num=6):
    rm_rating_NaN_df = process_df[~process_df['Rating'].str.contains(pat=r'NaN', regex=True)][['Rating', 'Category']]
    rm_rating_NaN_df = rm_rating_NaN_df[rm_rating_NaN_df['Category'] == catagory]
    rm_rating_NaN_df['Rating'] = rm_rating_NaN_df['Rating'].apply(pd.to_numeric)
    min = rm_rating_NaN_df['Rating'].min() - 0.1
    max = rm_rating_NaN_df['Rating'].max()
    gap = (max - min) / num
    bins = []
    for i in range(num + 1):
        bins.append(min + i * gap)
    quartiles = pd.cut(rm_rating_NaN_df['Rating'], bins=bins)
    counts = rm_rating_NaN_df.groupby(quartiles).count()['Rating']
    res_dict = {'x':[]}
    for i in range(num):
        name = str(round(bins[i], 2)) + " ~ " + str(round(bins[i + 1], 2))
        res_dict[name] = counts.values[i]
        res_dict['x'].append(name)
    return json.dumps(res_dict, cls=NpEncoder)


@app.get("/getVerCategoryInfo")
async def sendVerCategoryInfo():
    return getVerCategoryInfo()


@app.get("/getColumnData/<key>")
async def sendColumnData(key: str = 'Rating'):
    return getColumnData(key)


@app.get("/getCategories")
async def sendCategories(num: int = 10):
    return getCategories(num)


@app.get("/getRating/<category>")
async def sendRating(category: str = 'EVENTS', num: int = 5):
    return getRating(category, num)


if __name__ == '__main__':
    app.run(debug=True, port=8080)
