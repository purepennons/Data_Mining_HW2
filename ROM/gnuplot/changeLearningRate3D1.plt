reset
set title "Different Network Topologies - learning rate = 0.6" font "Times-Roman, 26"
set output "Different_network_topologies_learning rate_0.6.eps"
set dgrid3d 20,20,1	
#set nohidden3d
set ticslevel 0.5
#set view 60,30
set autoscale
set pm3d
set hidden3d
set parametric
set xlabel "x" 
set ylabel "y" 
set zlabel "frequency" 
#set data style points
#set data style lines
splot "changeLearningRate3D1.dat" title "learning rate = 0.6, number of network topologies = 20x20" with lines