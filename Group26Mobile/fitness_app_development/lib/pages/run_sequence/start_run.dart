import 'package:fitness_app_development/pages/home_page/home_screen.dart';
import 'package:fitness_app_development/pages/run_sequence/run_in_progress.dart';
import 'package:fitness_app_development/run_sequence_util/timer_data.dart';
import 'package:fitness_app_development/utilities/get_lb_data.dart';
import 'package:flutter/material.dart';


import '../home_page2.dart';


class StartRun extends StatefulWidget {

  @override
  _StartRunState createState() => _StartRunState();
}

class _StartRunState extends State<StartRun> {

 // bool selected = true;
  String imgUrl = 'https://www.vippng.com/png/detail/111-1117124_green-play-button-png-green-play-button-icon.png';
  @override
  Widget build(BuildContext context) {
    //final StopWatchTimer _stopWatchTimer = StopWatchTimer();
    //final _isMinutes = true;
    return Scaffold(
      appBar: AppBar(
        title: FittedBox(
          fit: BoxFit.fitWidth,
          child: Text('${TimerData.runName}', style: TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontSize: 20
          )),
        ),
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

          SingleChildScrollView(
            child: Column(
              children: [

                /*Text('${TimerData.runName}',style: const TextStyle(
                fontSize: 50.0,
                fontWeight: FontWeight.bold,
              ),),
              Divider(
                height: 20,
                thickness: 2,
                color: Colors.black,
              ),*/
                SizedBox(height:40),
                Text('Time', style: const TextStyle(
                  fontSize: 80.0,
                  fontWeight: FontWeight.bold,
                ),),

                Text('0:00.00',style: const TextStyle(
                  fontSize: 50.0,
                  fontWeight: FontWeight.bold,
                ),),
                // StreamBuilder<int>(
                // stream: _stopWatchTimer.rawTime,
                //initialData: _stopWatchTimer.rawTime.value,
                //builder: (context, snapshot) {
                //final value = snapshot.data;
                //final displayTime = StopWatchTimer.getDisplayTime(value!, hours: false);
                // return Text(
                // displayTime,
                //  style: const TextStyle(
                //   fontSize: 40.0,
                //    fontWeight: FontWeight.bold,
                //  ),
                //);

                // }),


                SizedBox(height: 20),
                Divider(
                  height: 20,
                  thickness: 2,
                  color: Colors.black,
                ),
                Text('Distance', style: const TextStyle(
                  fontSize: 80.0,
                  fontWeight: FontWeight.bold,
                ),),
                Text('0:00 Mi', style: const TextStyle(
                  fontSize: 50.0,
                  fontWeight: FontWeight.bold,
                ),),
                SizedBox(height: 20),
                Divider(
                  height: 20,
                  thickness: 2,
                  color: Colors.black,
                ),
                Text('Pace', style: const TextStyle(
                  fontSize: 80.0,
                  fontWeight: FontWeight.bold,
                ),),
                Text('0:00', style: const TextStyle(
                  fontSize: 50.0,
                  fontWeight: FontWeight.bold,
                ),),
                SizedBox(height: 20),
                Divider(
                  height: 20,
                  thickness: 2,
                  color: Colors.black,
                ),
                IconButton(
                    icon: CircleAvatar(
                      backgroundImage: NetworkImage(
                        imgUrl,

                      ),
                      radius: 40,
                    ),
                    iconSize: 100,
                    onPressed: () {

                      /*
                    _stopWatchTimer.onExecute.add(StopWatchExecute.start);

                    setState(() {
                      if(imgUrl.compareTo('https://www.vippng.com/png/detail/111-1117124_green-play-button-png-green-play-button-icon.png') == 0) {
                        imgUrl =
                        'https://www.pinclipart.com/picdir/middle/31-315907_red-stop-button-plain-icon-svg-clip-arts.png';

                      }
                      else {

                        imgUrl = 'https://www.vippng.com/png/detail/111-1117124_green-play-button-png-green-play-button-icon.png';
                      }


                    });

                    */


                      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => RunInProgress()));


                    }
                ),

              ],
            ),
          ),
        ],
      ),
    );
  }
}
