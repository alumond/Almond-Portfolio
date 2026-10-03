"""Reconcile the portfolio chart with its synthetic source CSV (Python 3).

Usage: python3 verify-retail.py retail_operations_kpis.csv retail-chart-data.json
Source snapshot: alumond/linkedin-AI-Agent@141568967e3bb3cbbebdd60b8b7b893c272619cd
This validates aggregation accuracy, not business impact or forecasting accuracy.
"""
import csv
import hashlib
import json
import sys
from collections import defaultdict
from pathlib import Path


def verify(csv_path, chart_path):
    rows = list(csv.DictReader(csv_path.open(encoding="utf-8")))
    chart = json.loads(chart_path.read_text())
    totals = defaultdict(lambda: defaultdict(int))
    categories = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))
    for row in rows:
        for metric, field in [("revenue", "revenue_ngn"), ("profit", "gross_profit_ngn"), ("orders", "orders")]:
            totals[row["month"]][metric] += int(row[field])
            if metric != "orders":
                categories[row["month"]][row["category"]][metric] += int(row[field])

    errors = []
    compared = 0
    if chart["records"] != len(rows):
        errors.append("Record count differs")
    if chart.get("synthetic") is not True:
        errors.append("Synthetic-data disclosure is missing")
    chart_months = [item["month"] for item in chart["months"]]
    if len(chart_months) != len(set(chart_months)) or set(chart_months) != set(totals):
        errors.append("Month coverage differs")
    for month in chart["months"]:
        key = month["month"]
        for metric in ("revenue", "profit", "orders"):
            compared += 1
            if month[metric] != totals[key][metric]:
                errors.append(f"{key}: {metric} differs")
        names = [item["name"] for item in month["categories"]]
        if len(names) != len(set(names)) or set(names) != set(categories[key]):
            errors.append(f"{key}: category coverage differs")
        for category in month["categories"]:
            for metric in ("revenue", "profit"):
                compared += 1
                if category[metric] != categories[key][category["name"]][metric]:
                    errors.append(f"{key}: {category['name']} {metric} differs")

    return {
        "source_commit": "141568967e3bb3cbbebdd60b8b7b893c272619cd",
        "synthetic": True,
        "records": len(rows),
        "months": len(totals),
        "totals_compared": compared,
        "mismatches": len(errors),
        "errors": errors,
        "source_csv_sha256": hashlib.sha256(csv_path.read_bytes()).hexdigest(),
        "chart_json_sha256": hashlib.sha256(chart_path.read_bytes()).hexdigest(),
        "scope": "Monthly revenue, profit and orders; category revenue and profit. Not a business-impact evaluation.",
    }


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    result = verify(Path(sys.argv[1]), Path(sys.argv[2]))
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result["errors"]))
