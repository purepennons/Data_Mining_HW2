reset
set title "Different Network Topologies" font "Times-Roman, 26" #修改20x20
set term postscript eps 22 color dashed linewidth 2
set output "Different_network_topologies_20x20.eps"	#修改20x20
set dgrid3d 20,20,1	#修改20,20,1
#set nohidden3d
set ticslevel 0.20
#set view 60,30
set autoscale
set pm3d
set hidden3d
set parametric
set xlabel "x" 
set ylabel "y" 
set zlabel "f" 
#set data style points
#set xlabel " data style lines, dgrid3d 20,20,1"
#set data style lines
splot "changeTopologyLiner3D2.dat" title "rate = 0.95, topologies = 20x20" with lines #修改檔名與20x20