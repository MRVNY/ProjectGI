rm all.csv

cat 0_header.csv >> all.csv

for f in *.csv; do
    if [ "$f" != "0_header.csv" ]; then
        rm tmp.csv
        tail -n +2 $f >> tmp.csv
        cat tmp.csv >> all.csv    
    fi
done

rm tmp.csv

# python3 analyse.py