import 'package:fitness_app_development/friends_util/constants.dart';
import 'package:fitness_app_development/utilities/global_data.dart';
import 'package:fitness_app_development/utilities/personal_run_data.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

class OldRun extends StatefulWidget {
  const OldRun({Key? key}) : super(key: key);

  @override
  _OldRunState createState() => _OldRunState();
}

class _OldRunState extends State<OldRun> {

  String _displayTime = '';
  double totalDistance = 0.0;
  double pace = 0.0;
  String paceT = '';
  String runName = '';

  late List<LatLng> cordies = [];

  @override
  void initState() {
    // TODO: implement initState
    _displayTime = GlobalData.resultObjs[RunData.index].time.toString();
    pace = GlobalData.resultObjs[RunData.index].pace;
    totalDistance = GlobalData.resultObjs[RunData.index].distance;
    runName = GlobalData.resultObjs[RunData.index].runName;
    for(int i = 0; i<GlobalData.resultObjs[RunData.index].coordinates.length; i++){
      cordies.add(LatLng(GlobalData.resultObjs[RunData.index].coordinates[i][1], GlobalData.resultObjs[RunData.index].coordinates[i][0]));
    }
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
    var milli = GlobalData.resultObjs[RunData.index].time;
    var min = ((milli) / 60000).floor();
    var sec = ((milli % 60000) / 1000).toStringAsFixed(2);
    var st = '';
    if ((milli % 60000) / 1000 < 10) {
      st = '0';
    } else st = '';

    _displayTime = '${min}:${st}${sec}';


    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Color(0xFF4294A2),
        title: Text("Gaurav Bavadiya"),
      ),
      body: Column(
        children: [
          Expanded(
            flex: 4,
            child: Container(
              color: Colors.grey,
              child: Center(
                child: MapboxMap(
                    accessToken: mapBoxApiKey,
                    initialCameraPosition: CameraPosition(
                      zoom: 15,
                      target: LatLng(GlobalData.resultObjs[RunData.index].coordinates[0][1], GlobalData.resultObjs[RunData.index].coordinates[0][0]),
                    ),
                    onMapCreated: (MapboxMapController controller) async {
                      // Acquire current location (returns the LatLng instance)
                      // You can either use the moveCamera or animateCamera, but the former
                      // causes a sudden movement from the initial to 'new' camera position,
                      // while animateCamera gives a smooth animated transition
                      await controller.animateCamera(
                        CameraUpdate.newLatLng(LatLng(GlobalData.resultObjs[RunData.index].coordinates[GlobalData.resultObjs[RunData.index].coordinates.length-1][1], GlobalData.resultObjs[RunData.index].coordinates[GlobalData.resultObjs[RunData.index].coordinates.length-1][0])),


                      );

                      controller.addLine(
                        LineOptions(
                          geometry: cordies,

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
                          geometry: LatLng(GlobalData.resultObjs[RunData.index].coordinates[0][1], GlobalData.resultObjs[RunData.index].coordinates[0][0]),
                        ),

                      );
                      //Add a circle denoting current user location
                      await controller.addCircle(
                        CircleOptions(
                          circleRadius: 8.0,
                          circleColor: '#0e4707',
                          //circleOpacity: 0.8,

                          // YOU NEED TO PROVIDE THIS FIELD!!!
                          // Otherwise, you'll get a silent exception somewhere in the stack
                          // trace, but the parameter is never marked as @required, so you'll
                          // never know unless you check the stack trace
                          geometry: LatLng(GlobalData.resultObjs[RunData.index].coordinates[0][1], GlobalData.resultObjs[RunData.index].coordinates[0][0]),
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
                          geometry: LatLng(GlobalData.resultObjs[RunData.index].coordinates[GlobalData.resultObjs[RunData.index].coordinates.length-1][1], GlobalData.resultObjs[RunData.index].coordinates[GlobalData.resultObjs[RunData.index].coordinates.length-1][0]),
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
                          geometry: LatLng(GlobalData.resultObjs[RunData.index].coordinates[GlobalData.resultObjs[RunData.index].coordinates.length-1][1], GlobalData.resultObjs[RunData.index].coordinates[GlobalData.resultObjs[RunData.index].coordinates.length-1][0]),
                        ),

                      );

                    }
                ),
              ),
            ),
          ),
          Expanded(
            flex: 3,
            child: Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    width: Get.width * 0.4,
                    margin: EdgeInsets.symmetric(vertical: 25, horizontal: 5),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.teal.withOpacity(0.2),
                          offset: Offset(2, 2),
                          blurRadius: 1,
                        )
                      ],
                      border: Border.all(color: Color(0xFF4294A2), width: 2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Text(
                        "Time\n${_displayTime}",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                  Container(
                    width: Get.width * 0.4,
                    margin: EdgeInsets.symmetric(vertical: 25, horizontal: 5),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.teal.withOpacity(0.2),
                          offset: Offset(2, 2),
                          blurRadius: 1,
                        )
                      ],
                      border: Border.all(color: Color(0xFF4294A2), width: 2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Text(
                        "Distance\n${totalDistance.toStringAsFixed(2) + ' Mi'}",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
