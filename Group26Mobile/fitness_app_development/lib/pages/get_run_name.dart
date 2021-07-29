import 'package:fitness_app_development/pages/home_page/home_screen.dart';
import 'package:fitness_app_development/pages/run_sequence/start_run.dart';
import 'package:fitness_app_development/run_sequence_util/timer_data.dart';
import 'package:fitness_app_development/utilities/get_lb_data.dart';
import 'package:flutter/material.dart';

import 'home_page2.dart';

class GetRunName extends StatefulWidget {

  @override
  _GetRunNameState createState() => _GetRunNameState();
}

class _GetRunNameState extends State<GetRunName> {
  final nameController = TextEditingController();

  @override
  void dispose(){ // dispose controller when page is disposed
    nameController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Start a New Run', style: TextStyle(
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
        body: Stack(
          children: [
            Container(
              height: double.infinity,
              width: double.infinity,
              decoration: BoxDecoration(
                  gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      stops: [0.5, 1],
                      colors: [Colors.cyan, Colors.blueAccent.shade700])
              ),
            ),
            Container(
              child: SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(),
                padding: EdgeInsets.symmetric(vertical: 80.0, horizontal: 40.0),

                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    /*Text(
                      'Start a New Run', style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 20)
                    ),*/

                    SizedBox(height: (MediaQuery.of(context).size.height) * .3),


                    TextField(
                      controller: nameController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Enter Run Name',
                        labelStyle: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 20)
                      ),
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () async { // connect to the reset email api or whatever here

                        String runName = nameController.text;
                        TimerData.runName = runName;
                        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => StartRun()));


                      },
                      child: Text('Submit'),
                    ),

                  ],
                ),
              ),

            ),
          ],
        )
    );
  }
}
