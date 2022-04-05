rm all.csv

for f in *.csv; do
    cat $f >> all.csv
done

python3 analyse.py