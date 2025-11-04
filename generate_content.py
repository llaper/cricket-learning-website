import json
import os
from openai import OpenAI

# 初始化OpenAI客户端
client = OpenAI()

# 读取内容列表
with open('/tmp/content_list.json', 'r', encoding='utf-8') as f:
    content_list = json.load(f)

# 读取现有内容
with open('public/data/cricket-content.json', 'r', encoding='utf-8') as f:
    existing_content = json.load(f)

# 读取研究资料
with open('research/cricket-history.md', 'r', encoding='utf-8') as f:
    history_ref = f.read()

with open('research/cricket-rules-formats.md', 'r', encoding='utf-8') as f:
    rules_ref = f.read()

def generate_content_for_topic(topic_id, topic_title, level):
    """为指定主题生成内容"""
    
    # 如果已有内容,跳过
    if topic_id in existing_content:
        print(f"跳过已有内容: {topic_id}")
        return existing_content[topic_id]
    
    prompt = f"""你是一位板球专家,需要为板球学习网站撰写专业内容。

主题ID: {topic_id}
主题标题: {topic_title}
难度级别: {level}

参考资料:
{history_ref[:2000]}
{rules_ref[:2000]}

要求:
1. 内容要专业、准确、详细
2. 使用完整的段落,而非列表
3. 包含具体的数据、规则、技术要点
4. 根据难度级别调整内容深度
5. 内容长度300-800字
6. 使用中文撰写
7. 可以适当引用规则条款或历史事件

请以JSON格式返回:
{{
  "title": "标题",
  "content": "详细内容(使用\\n\\n分隔段落)"
}}
"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "你是一位专业的板球运动专家和教练,擅长撰写教学内容。"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        result = json.loads(response.choices[0].message.content)
        print(f"✓ 生成内容: {topic_id}")
        return result
        
    except Exception as e:
        print(f"✗ 生成失败: {topic_id} - {e}")
        return {
            "title": topic_title,
            "content": f"{topic_title}的详细内容待补充。"
        }

# 生成前50个内容
print(f"开始生成内容,总共 {len(content_list)} 个主题")
print("=" * 60)

new_content = existing_content.copy()

for i, topic in enumerate(content_list[:50], 1):
    print(f"\n[{i}/50] 处理: {topic['title']}")
    result = generate_content_for_topic(topic['id'], topic['title'], topic['level'])
    new_content[topic['id']] = result

# 保存更新后的内容
with open('public/data/cricket-content.json', 'w', encoding='utf-8') as f:
    json.dump(new_content, f, ensure_ascii=False, indent=2)

print("\n" + "=" * 60)
print(f"内容生成完成! 已更新 {len(new_content)} 个主题")
