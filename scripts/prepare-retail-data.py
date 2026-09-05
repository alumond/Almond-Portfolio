"""Create small, reproducible chart data from the public synthetic retail CSV.

Usage: python3 scripts/prepare-retail-data.py path/to/retail_operations_kpis.csv
"""
import csv
import json
import sys
from pathlib import Path

rows = list(csv.DictReader(Path(sys.argv[1]).open()))
months = {}
for row in rows:
    month = months.setdefault(row['month'], {'month': row['month'], 'revenue': 0, 'profit': 0, 'orders': 0, 'categories': {}})
    category = month['categories'].setdefault(row['category'], {'name': row['category'], 'revenue': 0, 'profit': 0})
    for field, source in [('revenue', 'revenue_ngn'), ('profit', 'gross_profit_ngn')]:
        value = int(row[source])
        month[field] += value
        category[field] += value
    month['orders'] += int(row['orders'])
output = {'source': 'https://github.com/alumond/linkedin-AI-Agent/tree/main/projects/retail-revenue-command-center', 'synthetic': True, 'records': len(rows), 'months': [{**m, 'categories': list(m['categories'].values())} for _, m in sorted(months.items())]}
Path('app/lib/retail-data.json').write_text(json.dumps(output, indent=2) + '\n')
Path('public/data/retail-chart-data.json').write_text(json.dumps(output, indent=2) + '\n')
print(f"Prepared {len(rows)} records across {len(months)} months")
