rm all.csv

cat 0_header.csv >> all.csv

for f in *.csv; do
    if [ "$f" != "0_header.csv" ] && [ "$f" != "userdata.csv" ] && [ "$f" != "all.csv" ]; then
        tail -n +2 $f >> all.csv
    fi
done

# python3 analyse.py