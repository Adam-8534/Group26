import 'dart:convert';

import 'package:fitness_app_development/friends_util/constants.dart';
import 'package:fitness_app_development/pages/home_page/home_screen.dart';
import 'package:fitness_app_development/run_sequence_util/timer_data.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:fitness_app_development/utilities/get_lb_data.dart';
import 'package:fitness_app_development/utilities/global_data.dart';
import 'package:fitness_app_development/utilities/results.dart';
import 'package:fitness_app_development/utilities/results_runs.dart';
import 'package:flutter/material.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

import '../home_page2.dart';

class Completed extends StatefulWidget {

  @override
  _CompletedState createState() => _CompletedState();
}

class _CompletedState extends State<Completed> {

  String _displayTime = '';
  double totalDistance = 0.0;
  double pace = 0.0;
  String paceT = '0:00';



  final Map<String, dynamic> coords = {
    "latitude" : TimerData.latitude,
    "longitude" : TimerData.longitude,
  };




  @override
  void initState() {
    // TODO: implement initState
    _displayTime = TimerData.displayTime!;
    pace = TimerData.pace!;
    totalDistance = TimerData.totalDistance!;

    double minutes = pace.floorToDouble();

    double deciSeconds = pace - minutes;

    double seconds = deciSeconds*60.0;

    int minutesInt = minutes.toInt();
    int secondsInt = seconds.toInt();

    if(secondsInt < 10){
      paceT ='$minutesInt:0$secondsInt';
    }
    else{
      paceT ='$minutesInt:$secondsInt';
    }


    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    TimerData.stopWatchTimer!.dispose();
    TimerData.rawTime = 0;
    TimerData.secondTime = 0;
    TimerData.minuteTime = 0;
    TimerData.totalDistance = 0.0;
    TimerData.pace = 0;
    TimerData.displayTime = '';
    TimerData.hi='';
    TimerData.cordies = [];
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.cyan.shade600,
        title: Text('${TimerData.runName}', style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
            fontSize: 20
        )),
        leading: new IconButton(
          onPressed: () async {
            await Leaderboard.getTotalData();
            await Leaderboard.getRunData();
            await Leaderboard.getLeaderboardData();
            Navigator.of(context).popUntil((route) => route.isFirst);
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => HomeScreen()));
          },
          icon: new Icon(Icons.arrow_back, color: Colors.black),
        ),
      ),
      body: SafeArea(
        child: Container(
          decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  stops: [0.5, 1],
                  colors: [Colors.cyan, Colors.blueAccent.shade700])
          ),
          child: Column(
            children: [
              SizedBox(
                height: (MediaQuery.of(context).size.height) * .5,
                child: MapboxMap(
                    accessToken: mapBoxApiKey,
                    initialCameraPosition: CameraPosition(
                      zoom: 15,
                      target: LatLng(TimerData.latitude[0], TimerData.longitude[0]),
                    ),
                    onMapCreated: (MapboxMapController controller) async {


                      // Acquire current location (returns the LatLng instance)
                      // You can either use the moveCamera or animateCamera, but the former
                      // causes a sudden movement from the initial to 'new' camera position,
                      // while animateCamera gives a smooth animated transition
                      await controller.animateCamera(

                        CameraUpdate.newLatLng(LatLng(TimerData.latitude[TimerData.latitude.length - 1], TimerData.longitude[TimerData.latitude.length - 1])),


                      );


                      controller.addLine(
                        LineOptions(
                          geometry: TimerData.cordies,

                          lineColor: "#c402b7",
                          lineWidth: 7.0,
                          //lineOpacity: .8,
                          draggable: false,
                        ),

                      );

                      await controller.addSymbol(

                        SymbolOptions(
                          textField: 'Start',
                          textColor: "#0e4707",
                          textSize: 35,
                          zIndex: 5,
                          textOffset: Offset.fromDirection(5.0),
                          geometry: LatLng(TimerData.latitude[0], TimerData.longitude[0]),
                        ),

                      );

                      await controller.addCircle(
                        CircleOptions(
                          circleRadius: 8.0,
                          circleColor: '#0e4707',
                          //circleOpacity: 0.8,

                          // YOU NEED TO PROVIDE THIS FIELD!!!
                          // Otherwise, you'll get a silent exception somewhere in the stack
                          // trace, but the parameter is never marked as @required, so you'll
                          // never know unless you check the stack trace
                          geometry: LatLng(TimerData.latitude[0], TimerData.longitude[0]),
                          draggable: false,
                        ),

                      );


                      await controller.addCircle(
                        CircleOptions(
                          circleRadius: 8.0,
                          circleColor: '#c40202',
                          //circleOpacity: 0.8,

                          // YOU NEED TO PROVIDE THIS FIELD!!!
                          // Otherwise, you'll get a silent exception somewhere in the stack
                          // trace, but the parameter is never marked as @required, so you'll
                          // never know unless you check the stack trace
                          geometry: LatLng(TimerData.latitude[TimerData.latitude.length - 1], TimerData.longitude[TimerData.latitude.length - 1]),
                          draggable: false,
                        ),
                      );


                      await controller.addSymbol(

                        SymbolOptions(
                          textField: 'End',
                          textColor: "#c40202",
                          textSize: 35,
                          zIndex: 5,
                          textOffset: Offset.fromDirection(5.0),
                          geometry: LatLng(TimerData.latitude[TimerData.latitude.length - 1], TimerData.longitude[TimerData.latitude.length - 1]),
                        ),

                      );




                    }
                ),



              ),

              SizedBox(height: 10),
              Text('Time',style: const TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),),
              Text(
                _displayTime,
                style: const TextStyle(
                  fontSize: 25.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20),
              Divider(
                height: 20,
                thickness: 2,
                color: Colors.black,
              ),
              Text('Distance',style: const TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),),
              Text('${totalDistance.toStringAsFixed(2)} Mi',style: const TextStyle(
                fontSize: 25.0,
                fontWeight: FontWeight.bold,
              ),),
              SizedBox(height: 20),
              Divider(
                height: 20,
                thickness: 2,
                color: Colors.black,
              ),
              Text('Pace',style: const TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),),
              Text(paceT,style: const TextStyle(
                fontSize: 25.0,
                fontWeight: FontWeight.bold,
              ),),



              /*
              Divider(
                height: 20,
                thickness: 2,
                color: Colors.black,
              ),




              ElevatedButton(
                  onPressed: () async {
                    await getTotalData();
                    await getRunData();
                    Navigator.of(context).popUntil((route) => route.isFirst);
                    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home()));
                  },
                  child: Text(
                      'Return to home Page',
                    style: const TextStyle(
                    fontSize: 40.0,
                    fontWeight: FontWeight.bold,
                    ),
                  )
              ),
              // need to add button to get to home page
              // pop all the way to home page??
              */
            ],
          ),
        ),
      ),
    );
  }




}