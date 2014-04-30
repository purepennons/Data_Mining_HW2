reset
set term postscript eps 22 color dashed linewidth 2
set output  "Different_network_topologies.eps"

set title "Different Network Topologies"
set xlabel "iterations" font "Times-Roman, 26"
set ylabel offset 1.5 "error" font "Times-Roman, 26"
set xtic 0,20,200 font "Times-Roman,16" nomirror
#set yr [800:4000]
#set ytics 300
set key top right

set style data linespoints
set style line 1 lt 1 pt 7 ps 2 lw 4 lc rgb "red"
set style line 2 lt 1 pt 13 ps 2 lw 4 lc rgb "green"
set style line 3 lt 1 pt 3 ps 2 lw 4 lc rgb "blue"
plot \
	"changeTopologyLiner0.dat" using 1 title "5x5" ls 1 with lines, \
	"changeTopologyLiner1.dat" using 1 title '10x10' ls 2 with lines, \
	"changeTopologyLiner2.dat" using 1 title '20x20' ls 3 with lines