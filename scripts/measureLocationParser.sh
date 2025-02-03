#!/bin/bash

# Input file (you can specify your file name here)
file="../src/data/RawMeasureXML.txt"

# Extracting content between <d:CurrentLocation> and the next <
sed -n 's/.*<d:CurrentLocation>\([^<]*\)<.*/\1/p' "$file" | sort | uniq
