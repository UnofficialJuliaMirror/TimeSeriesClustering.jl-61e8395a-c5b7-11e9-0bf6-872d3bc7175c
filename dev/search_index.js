var documenterSearchIndex = {"docs":
[{"location":"#![ClustForOpt-logo](assets/clust_for_opt_text.svg)-1","page":"Introduction","title":"(Image: ClustForOpt logo)","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"(Image: ) (Image: ) (Image: Build Status)","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"ClustForOpt is a julia implementation of unsupervised machine learning methods for finding representative periods for energy systems optimization problems. By reducing the number of time steps used in the optimization model, using representative periods leads to significant reductions in computational complexity.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"The package has three main purposes:","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"Provide a simple process of finding representative periods for time-series input data, with implementations of the most commonly used clustering methods and extreme value selection methods.\nProvide an interface between representative period data and optimization problem by having representative period data stored in a generalized type system.\nProvide a generalized import feature for time series, where variable names, attributes, and node names are automatically stored and can then be used in the definition of sets of the optimization problem later.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"An example energy systems optimization problem that uses ClustForOpt for its input data is the package CapacityExpansion, which implements a scalable generation and transmission capacity expansion problem.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"The ClustForOpt package follows the clustering framework presented in Teichgraeber and Brandt, 2019. The package is actively developed, and new features are continuously added. For a reproducible version of the methods and data of the original paper by Teichgraeber and Brandt, 2019, please refer to v0.1.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"This package is developed by Holger Teichgraeber @holgerteichgraeber and Elias Kuepper @YoungFaithful.","category":"page"},{"location":"#Installation-1","page":"Introduction","title":"Installation","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"This package runs under julia v1.0 and higher. Install using:","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"import Pkg\nPkg.add(\"ClustForOpt\")","category":"page"},{"location":"#Citing-ClustForOpt-1","page":"Introduction","title":"Citing ClustForOpt","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"If you find ClustForOpt useful in your work, we kindly request that you cite the following paper (link):","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"  @article{Teichgraeber2019,\n  author = {Holger Teichgraeber and Adam Brandt},\n  title = {Clustering methods to find representative periods for the optimization of energy systems: An initial framework and comparison},\n  journal = {Applied Energy},\n  volume = {239},\n  pages = {1283–1293},\n  year = {2019},\n  doi = {https://doi.org/10.1016/j.apenergy.2019.02.012},\n  }","category":"page"},{"location":"quickstart/#Quick-Start-Guide-1","page":"Quick Start Guide","title":"Quick Start Guide","text":"","category":"section"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"This quick start guide introduces the main concepts of using ClustForOpt. For more detail on the different functionalities that ClustForOpt provides, please refer to the subsequent chapters of the documentation or the examples in the examples folder.","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"Generally, the workflow consists of three steps:","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"load data\nfind representative periods (clustering + extreme period selection)\noptimization","category":"page"},{"location":"quickstart/#Example-Workflow-1","page":"Quick Start Guide","title":"Example Workflow","text":"","category":"section"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"After ClustForOpt is installed, you can use it by saying:","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"using ClustForOpt","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"The first step is to load the data. The following example loads hourly wind, solar, and demand data for Germany (1 region) for one year.","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"ts_input_data = load_timeseries_data(:CEP_GER1)","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"The output ts_input_data is a ClustData data struct that contains the data and additional information about the data.","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"ts_input_data.data # a dictionary with the data.\nts_input_data.data[\"wind-germany\"] # the wind data (choose solar, el_demand as other options in this example)\nts_input_data.K # number of periods","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"The second step is to cluster the data into representative periods. Here, we use k-means clustering and get 5 representative periods.","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"clust_res = run_clust(ts_input_data;method=\"kmeans\",n_clust=5)\nts_clust_data = clust_res.clust_data","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"The ts_clust_data is a ClustData data struct, this time with clustered data (i.e. less representative periods).","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"ts_clust_data.data # the clustered data\nts_clust_data.data[\"wind-germany\"] # the wind data. Note the dimensions compared to ts_input_data\nts_clust_data.K # number of periods","category":"page"},{"location":"quickstart/#","page":"Quick Start Guide","title":"Quick Start Guide","text":"The clustered input data can be used as input to an optimization problem. The optimization problem formulated in the package CapacityExpansion can be used with the data clustered in this example.","category":"page"},{"location":"load_data/#Load-Data-1","page":"Load Data","title":"Load Data","text":"","category":"section"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"Here, we describe how to load time-series data into the ClustData format for use in ClustForOpt, and we describe how data is stored in ClustData. Data can be loaded from example data sets provided by us, or you can load your own data.","category":"page"},{"location":"load_data/#Load-example-data-from-ClustForOpt-1","page":"Load Data","title":"Load example data from ClustForOpt","text":"","category":"section"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"The example data can be loaded using the following function.","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"load_timeseries_data(::Symbol)","category":"page"},{"location":"load_data/#ClustForOpt.load_timeseries_data-Tuple{Symbol}","page":"Load Data","title":"ClustForOpt.load_timeseries_data","text":"function load_timeseries_data(existing_data::Symbol;\n                          region::String=\"none\",\n                          T::Int=24,\n                          years::Array{Int,1}=[2016],\n                          att::Array{String,1}=Array{String,1}())\n\nReturn time series of example data sets as ClustData struct.\n\nThe choice of example data set is given by e.g. existing_data=:CEP-GER1. Example data sets are:\n\n:DAM_CA : Hourly Day Ahead Market Electricity prices for California-Stanford 2015\n:DAM_GER : Hourly Day Ahead Market Electricity prices for Germany 2015\n:CEP_GER1 : Hourly Wind, Solar, Demand data Germany one node\n:CEP_GER18: Hourly Wind, Solar, Demand data Germany 18 nodes\n\nOptional inputs to load_timeseries_data:\n\nregion-region descriptor\nT- Number of Segments\nyears::Array{Int,1}= The years to be selected from the csv file as specified in years column\natt::Array{String,1}= The attributes to be loaded. If left empty, all attributes will be loaded.\n\n\n\n\n\n","category":"method"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"In the following example, we use the function to load the hourly wind, solar, demand data for Germany for 1 node, and the other data can be loaded similarly. Note that more years are available for the two CEP data sets. The data can be found in the data folder.","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"using ClustForOpt","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"ts_input_data = load_timeseries_data(:CEP_GER1)","category":"page"},{"location":"load_data/#Load-your-own-data-1","page":"Load Data","title":"Load your own data","text":"","category":"section"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"You can also load your own data. Use the load_timeseries_data function and specify the path where the data is located at (either a folder or the filename).","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"load_timeseries_data(::String)","category":"page"},{"location":"load_data/#ClustForOpt.load_timeseries_data-Tuple{String}","page":"Load Data","title":"ClustForOpt.load_timeseries_data","text":"function load_timeseries_data(data_path::String;\n                          region::String=\"none\",\n                          T::Int=24,\n                          years::Array{Int,1}=[2016],\n                          att::Array{String,1}=Array{String,1}())\n\nReturn all time series as ClustData struct that are stored as csv files in the specified path.\n\nLoads *.csv files in the folder or the file data_path\nLoads all attributes (all *.csv files) if the att-Array is empty or only the files specified in att\nThe *.csv files shall have the following structure and must have the same length:\n\nTimestamp Year [column names...]\n[iterator] [year] [values]\n\nThe first column of a .csv file should be called Timestamp if it contains a time iterator\nThe second column should be called Year and contains the corresponding year\nEach other column should contain the time series data. For one node systems, only one column is used; for an N-node system, N columns need to be used. In an N-node system, each column specifies time series data at a specific geolocation.\nReturns time series as ClustData struct\nThe .data field of the ClustData struct is a Dictionary where each column in [file name].csv file is the key (called \"[file name]-[column name]\"). file name should correspond to the attribute name, and column name should correspond to the node name.\n\nOptional inputs to load_timeseries_data:\n\nregion-region descriptor\nT- Number of Segments\nyears::Array{Int,1}= The years to be selected from the csv file as specified in years column\natt::Array{String,1}= The attributes to be loaded. If left empty, all attributes will be loaded.\n\n\n\n\n\n","category":"method"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"The data in your .csv file should be in the format Timestamp-Year-ColumnName as specified above. The files in the single node system GER1 and multi-node system GER18 give a good overview of how the data should be structured.","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"The path can be relative or absolute as in the following example","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"ts_input_data = load_timeseries_data(normpath(joinpath(@__DIR__,\"..\",\"..\",\"data\",\"TS_GER_1\"))) # relative path from the documentation file to the data folder\nts_input_data = load_timeseries_data(\"/home/username/yourpathtofolder\") # absolute path on Linux/Mac\nts_input_data = load_timeseries_data(\"C:\\\\Users\\\\Username\\\\yourpathtofolder\") # absolute path on Windows","category":"page"},{"location":"load_data/#ClustData-struct-1","page":"Load Data","title":"ClustData struct","text":"","category":"section"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"The ClustData struct is at the core of ClustForOpt. It contains the temporal input data, and also relevant information that can be easily used in the formulation of the optimization problem.","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"ClustData","category":"page"},{"location":"load_data/#ClustForOpt.ClustData","page":"Load Data","title":"ClustForOpt.ClustData","text":"  ClustData <: TSData\n\nContains time series data by attribute (e.g. wind, solar, electricity demand) and respective information.\n\nFields:\n\nregion::String: optional information to specify the region data belongs to\nK::Int: number of periods\nT::Int: time steps per period\ndata::Dict{String,Array}: Dictionary with an entry for each attribute [file name (attribute: e.g technology)]-[column name (node: e.g. location)], Each entry of the dictionary is a 2-dimensional time-steps T x periods K-Array holding the data\nweights::Array{Float64,2}: 1-dimensional periods K-Array with the absolute weight for each period. The weight of a period corresponds to the number of days it representes. E.g. for a year of 365 days, sum(weights)=365\nmean::Dict{String,Array}: Dictionary with a entry for each attribute [file name (e.g technology)]-[column name (e.g. location)], Each entry of the dictionary is a 1-dimensional periods K-Array holding the shift of the mean. This is used internally for normalization.\nsdv::Dict{String,Array}:  Dictionary with an entry for each attribute [file name (e.g technology)]-[column name (e.g. location)], Each entry of the dictionary is a 1-dimensional periods K-Array holding the standard deviation. This is used internally for normalization.\ndelta_t::Array{Float64,2}: 2-dimensional time-steps T x periods K-Array with the temporal duration Δt for each timestep. The default is that all timesteps have the same length.\nk_ids::Array{Int}: 1-dimensional original periods I-Array with the information, which original period is represented by which period K. E.g. if the data is a year of 365 periods, the array has length 365. If an original period is not represented by any period within this ClustData the entry will be 0.\n\n\n\n\n\n","category":"type"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"Note that K and T can be used to construct sets that define the temporal structure of the optimization problem, and that weights can be used to weight the representative periods in the objective function of the optimization problem. k_ids can be used to implement seasonal storage formulations for long-term energy systems optimization problems. delta_t can be used to implement within-period segmentation. ","category":"page"},{"location":"load_data/#Example-data-1","page":"Load Data","title":"Example data","text":"","category":"section"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"This shows the solar data as an example.","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"using ClustForOpt\nts_input_data = load_timeseries_data(:CEP_GER1; T=24, years=[2016])\nusing Plots\nplot(ts_input_data.data[\"solar-germany\"], legend=false, linestyle=:dot, xlabel=\"Time [h]\", ylabel=\"Solar availability factor [%]\")\nsavefig(\"load_timeseries_data.svg\")","category":"page"},{"location":"load_data/#","page":"Load Data","title":"Load Data","text":"(Image: Plot)","category":"page"},{"location":"repr_per/#Representative-Periods-1","page":"Representative Periods","title":"Representative Periods","text":"","category":"section"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The following describes how to find representative periods out of the full time-series input data. This includes both clustering and extreme period selection.","category":"page"},{"location":"repr_per/#Clustering-1","page":"Representative Periods","title":"Clustering","text":"","category":"section"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The function run_clust() takes the data and gives a ClustResult struct with the clustered data as the output.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"run_clust(::ClustData)","category":"page"},{"location":"repr_per/#ClustForOpt.run_clust-Tuple{ClustData}","page":"Representative Periods","title":"ClustForOpt.run_clust","text":"run_clust(data::ClustData;\n  norm_op::String=\"zscore\",\n  norm_scope::String=\"full\",\n  method::String=\"kmeans\",\n  representation::String=\"centroid\",\n  n_clust::Int=5,\n  n_seg::Int=data.T,\n  n_init::Int=1000,\n  iterations::Int=300,\n  attribute_weights::Dict{String,Float64}=Dict{String,Float64}(),\n  save::String=\"\",#QUESTION dead?\n  get_all_clust_results::Bool=false,\n  kwargs...)\n\nTake input data data of dimensionality N x T and cluster into data of dimensionality K x T.\n\nThe following combinations of method and representation are supported by run_clust:\n\nName method representation comment\nk-means clustering <kmeans> <centroid> -\nk-means clustering with medoid representation <kmeans> <medoid> -\nk-medoids clustering (partitional) <kmedoids> <medoid> -\nk-medoids clustering (exact) <kmedoids_exact> <medoid> requires Gurobi and the additional keyword argument kmexact_optimizer. See [examples] folder for example use. Set n_init=1\nhierarchical clustering with centroid representation <hierarchical> <centroid> set n_init=1\nhierarchical clustering with medoid representation <hierarchical> <medoid> set n_init=1\n\nThe other optional inputs are:\n\nKeyword options comment\nnorm_op zscore Normalization operation. 0-1 not yet implemented\nnorm_scope full,sequence,hourly Normalization scope. The default (full) is used in most of the current literature.\nn_clust e.g. 5 Number of clusters that you want to obtain\nn_seg e.g. 10 Number of segments per period. Not yet implemented, keep as default value.\nn_init e.g. 1000 Number of initializations of locally converging clustering algorithms. 10000 often yields very stable results.\niterations e.g. 300 Internal parameter of the partitional clustering algorithms.\nattribute_weights e.g. Dict(\"wind-germany\"=>3,\"solar-germany\"=>1,\"el_demand-germany\"=>5) weights the respective attributes when clustering. In this example, demand and wind are deemed more important than solar.\nsave false Save clustered data as csv or jld2 file. Not yet implemented.\nget_all_clust_results true,false false gives a ClustData struct with only the best locally converged solution in terms of clustering measure. true gives a ClustDataAll struct as output, with all locally converged solutions.\nkwargs e.g. kmexact_optimizer optional keyword arguments that are required for specific methods, for example k-medoids exact.\n\n\n\n\n\n","category":"method"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The following examples show some use cases of run_clust.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"using ClustForOpt\nts_input_data=load_timeseries_data(:CEP_GER1)","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"clust_res = run_clust(ts_input_data) # uses the default values, so this is a k-means clustering algorithm with centroid representation that finds 5 clusters.\nclust_res = run_clust(ts_input_data;method=\"kmedoids\",representation=\"medoid\",n_clust=10) #kmedoids clustering that finds 10 clusters\nclust_res = run_clust(ts_input_data;method=\"hierarchical\",representation=medoid,n_init=1) # Hierarchical clustering with medoid representation.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The resulting struct contains the data, but also cost and configuration information.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"ts_clust_data = clust_res.clust_data\nclust_cost = clust_res.cost\nclust_config = clust_res.config","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The ts_clust_data is a ClustData data struct, this time with clustered data (i.e. less representative periods).","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"Shape-based clustering methods are supported in an older version of ClustForOpt: For use of DTW barycenter averaging (DBA) and k-shape clustering on single-attribute data (e.g. electricity prices), please use v0.1.","category":"page"},{"location":"repr_per/#Extreme-period-selection-1","page":"Representative Periods","title":"Extreme period selection","text":"","category":"section"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"Additionally to clustering the input data, extremes of the data may be relevant to the optimization problem. Therefore, we provide methods for extreme value identification, and to include them in the set of representative periods.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The methods can be used as follows.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"using ClustForOpt\nts_input_data = load_timeseries_data(:CEP_GER1)\n # define simple extreme days of interest\n ev1 = SimpleExtremeValueDescr(\"wind-germany\",\"min\",\"absolute\")\n ev2 = SimpleExtremeValueDescr(\"solar-germany\",\"min\",\"integral\")\n ev3 = SimpleExtremeValueDescr(\"el_demand-germany\",\"max\",\"absolute\")\n ev = [ev1, ev2, ev3]\n # simple extreme day selection\n ts_input_data_mod,extr_vals,extr_idcs = simple_extr_val_sel(ts_input_data,ev;rep_mod_method=\"feasibility\")\n\n # run clustering\nts_clust_res = run_clust(ts_input_data_mod;method=\"kmeans\",representation=\"centroid\",n_init=100,n_clust=5) # default k-means\n\n# representation modification\nts_clust_extr = representation_modification(extr_vals,ts_clust_res.clust_data)","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The resulting ts_clust_extr contains both the clustered periods and the extreme periods.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The extreme periods are first defined by their characteristics by use of SimpleExtremeValueDescr. The struct has the following options:","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"SimpleExtremeValueDescr(::String,::String,::String)","category":"page"},{"location":"repr_per/#ClustForOpt.SimpleExtremeValueDescr-Tuple{String,String,String}","page":"Representative Periods","title":"ClustForOpt.SimpleExtremeValueDescr","text":"SimpleExtremeValueDescr(data_type::String,\n                             extremum::String,\n                             peak_def::String)\n\nDefines a simple extreme day by its characteristics\n\nInput options:\n\ndata_type::String : Choose one of the attributes from the data you have loaded into ClustData\nextremum::String : min,max\npeak_def::String : absolute,integral\n\n\n\n\n\n","category":"method"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"Then, they are selected based on the function simple_extr_val_sel:","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"simple_extr_val_sel(::ClustData, ::Array{SimpleExtremeValueDescr,1})","category":"page"},{"location":"repr_per/#ClustForOpt.simple_extr_val_sel-Tuple{ClustData,Array{SimpleExtremeValueDescr,1}}","page":"Representative Periods","title":"ClustForOpt.simple_extr_val_sel","text":"simple_extr_val_sel(data::ClustData,\n                    extreme_value_descr_ar::Array{SimpleExtremeValueDescr,1};\n                    rep_mod_method::String=\"feasibility\")\n\nSelects simple extreme values and returns modified data, extreme values, and the corresponding indices.\n\nInputs options for rep_mod_method:\n\nrep_mod_method::String : feasibility,append\n\n\n\n\n\n","category":"method"},{"location":"repr_per/#ClustResult-struct-1","page":"Representative Periods","title":"ClustResult struct","text":"","category":"section"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"The output of run_clust function is a ClustResult struct with the following fields.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"ClustResult","category":"page"},{"location":"repr_per/#ClustForOpt.ClustResult","page":"Representative Periods","title":"ClustForOpt.ClustResult","text":"ClustResult <: AbstractClustResult\n\nContains the results from a clustering run: The data, the cost in terms of the clustering algorithm, and a config file describing the clustering method used.\n\nFields:\n\nclust_data::ClustData\ncost::Float64: Cost of the clustering algorithm\nconfig::Dict{String,Any}: Details on the clustering method used\n\n\n\n\n\n","category":"type"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"If run_clust is run with the option get_all_clust_results=true, the output is the struct ClustResultAll, which contains all locally converged solutions.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"ClustResultAll","category":"page"},{"location":"repr_per/#ClustForOpt.ClustResultAll","page":"Representative Periods","title":"ClustForOpt.ClustResultAll","text":"ClustResultAll <: AbstractClustResult\n\nContains the results from a clustering run for all locally converged solutions\n\nFields:\n\nclust_data::ClustData: The best centers, weights, clustids in terms of cost of the clustering algorithm\ncost::Float64: Cost of the clustering algorithm\nconfig::Dict{String,Any}: Details on the clustering method used\ncenters_all::Array{Array{Float64},1}\nweights_all::Array{Array{Float64},1}\nclustids_all::Array{Array{Int,1},1}\ncost_all::Array{Float64,1}\niter_all::Array{Int,1}\n\n\n\n\n\n","category":"type"},{"location":"repr_per/#Example-running-clustering-1","page":"Representative Periods","title":"Example running clustering","text":"","category":"section"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"In this example, the wind, solar, and demand data from Germany for 2016 are clustered to 5 representative periods, and the solar data is shown in the plot.","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"using ClustForOpt\nts_input_data = load_timeseries_data(:CEP_GER1; T=24, years=[2016])\nts_clust_data = run_clust(ts_input_data;n_clust=5).clust_data\nusing Plots\nplot(ts_clust_data.data[\"solar-germany\"], legend=false, linestyle=:solid, width=3, xlabel=\"Time [h]\", ylabel=\"Solar availability factor [%]\")\nsavefig(\"clust.svg\")","category":"page"},{"location":"repr_per/#","page":"Representative Periods","title":"Representative Periods","text":"(Image: Plot)","category":"page"},{"location":"opt/#Optimization-1","page":"Optimization","title":"Optimization","text":"","category":"section"},{"location":"opt/#","page":"Optimization","title":"Optimization","text":"The main purpose of this package is to provide a process and type system (structs) that can be easily integrated with optimization problems. ClustForOpt allows for the data to be processed in one single type, regardless of the dimensionality of the input data. This allows to quickly evaluate different temporal resolutions on a given optimization model.","category":"page"},{"location":"opt/#","page":"Optimization","title":"Optimization","text":"The most important fields of the data struct are","category":"page"},{"location":"opt/#","page":"Optimization","title":"Optimization","text":"using ClustForOpt\nts_input_data = load_timeseries_data(:CEP_GER1)","category":"page"},{"location":"opt/#","page":"Optimization","title":"Optimization","text":"ts_clust_data.data # the clustered data\nts_clust_data.K # number of periods\nts_clust_data.T # number of time steps per period","category":"page"},{"location":"opt/#","page":"Optimization","title":"Optimization","text":"K and T can be directly integrated in the creation of the sets that define the temporal resolution of the formulation of the optimization problem.","category":"page"},{"location":"opt/#","page":"Optimization","title":"Optimization","text":"The package CapacityExpansion provides a generation and transmission capacity expansion problem that can utilize the wind, solar, and demand data from the :CEP_GER1 and :CEP_GER18 examples and uses the data types introduced in ClustForOpt. Please refer to the documentation of the CapacityExpansion package for how to use it.","category":"page"}]
}
