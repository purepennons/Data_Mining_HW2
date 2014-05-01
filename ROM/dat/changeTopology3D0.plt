reset
set title "Different Network Topologies" font "Times-Roman, 26" #修改5x5
set term postscript eps 22 color dashed linewidth 2
set output "Different_network_topologies_5x5.eps"	#修改5x5
set dgrid3d 5,5,1	#修改5,5,1
#set nohidden3d
set ticslevel 0.5
#set view 60,30
set autoscale
set pm3d
set hidden3d
set parametric
set xlabel "x" 
set ylabel "y" 
set zlabel "f" 
#set data style points
#set xlabel " data style lines, dgrid3d 5,5,1"
#set data style lines
splot "changeTopologyLiner3D0.dat" title "rate = 0.95, topologies = 5x5" with lines #修改檔名與5x5