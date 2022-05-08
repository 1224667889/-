from PIL import Image
from matplotlib import pyplot as plt
from wordcloud import WordCloud
from io import BytesIO
import base64


def word_cloud(data: list):
    res_dict = {}
    res_list = []
    index_key = ""
    for it in data:
        for chi in it.keys():
            if chi != "area":
                res_list.append(it[chi])
            else:
                index_key = it[chi]
        res_dict[index_key] = res_list[0]
        res_list = []
    if not res_dict:
        res_dict = {" ": 1}
    wc = WordCloud(
        font_path='simhei.ttf',
        min_font_size=20,
        # background_color="white",
        width=600,
        height=500,
        margin=10
    ).fit_words(res_dict)
    matrix_RGB = wc.to_array()
    image = Image.fromarray(matrix_RGB)

    buff = BytesIO()
    image.save(buff, format='PNG')
    img_str = base64.b64encode(buff.getvalue())
    img_str = str(img_str, "utf-8")
    return 'data:image/PNG;base64,' + img_str


if __name__ == '__main__':
    data_list=[
        {
            "area": "四川",
            "num": 244
        },
        {
            "area": "新疆",
            "num": 169
        },
        {
            "area": "西藏",
            "num": 80
        },
        {
            "area": "云南",
            "num": 78
        },
        {
            "area": "青海",
            "num": 53
        },
        {
            "area": "甘肃",
            "num": 29
        },
        {
            "area": "内蒙古",
            "num": 27
        },
        {
            "area": "吉林",
            "num": 24
        },
        {
            "area": "台湾",
            "num": 23
        },
        {
            "area": "山东",
            "num": 8
        },
        {
            "area": "山西",
            "num": 8
        },
        {
            "area": "广东",
            "num": 7
        },
        {
            "area": "福建",
            "num": 7
        },
        {
            "area": "陕西",
            "num": 6
        },
        {
            "area": "辽宁",
            "num": 6
        },
        {
            "area": "广西",
            "num": 4
        },
        {
            "area": "河北",
            "num": 3
        },
        {
            "area": "黑龙江",
            "num": 3
        },
        {
            "area": "湖北",
            "num": 3
        },
        {
            "area": "贵州",
            "num": 2
        },
        {
            "area": "江苏",
            "num": 2
        },
        {
            "area": "江西",
            "num": 1
        },
        {
            "area": "海南",
            "num": 1
        },
        {
            "area": "天津",
            "num": 1
        },
        {
            "area": "重庆",
            "num": 1
        },
        {
            "area": "河南",
            "num": 1
        },
        {
            "area": "北京",
            "num": 1
        },
        {
            "area": "安徽",
            "num": 1
        }
    ]
    print(word_cloud(data_list))