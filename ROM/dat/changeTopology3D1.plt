reset
set title "Different Network Topologies" font "Times-Roman, 26" #修改10x10
set term postscript eps 22 color dashed linewidth 2
set output "Different_network_topologies_10x10.eps"	#修改10x10
#set term jpeg enhanced font "Helvetica"
#set output "Different_network_topologies_10x10.jpeg" 
set dgrid3d 10,10,1	#修改10,10,1
#set nohidden3d
set ticslevel 0.10
#set view 60,30
set autoscale
set pm3d
set hidden3d
set parametric
set xlabel "x" 
set ylabel "y" 
set zlabel "f" 
#set data style points
#set xlabel " data style lines, dgrid3d 10,10,1"
#set data style lines
splot "changeTopologyLiner3D1.dat" title "rate = 0.95, topologies = 10x10" with lines #修改檔名與10x10