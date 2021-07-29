import 'package:flutter/material.dart';
// ignore: import_of_legacy_library_into_null_safe
import 'package:flutter_gravatar/flutter_gravatar.dart';
import 'package:flutter_gravatar/utils.dart';

class ProfilePage extends StatefulWidget {
  final String? userName;
  final String? userEmail;
  final String? fullName;
  final num? totalRun;
  final num? totalDistance;
  final num? totalTime;

  ProfilePage(
      {@required this.userName,
        @required this.userEmail,
        @required this.fullName,
        @required this.totalRun,
        @required this.totalDistance,
        @required this.totalTime,


      });

  _UserState createState() => _UserState();
}

class _UserState extends State<ProfilePage> {
  String? _email;
  Gravatar? _gravatar;

  @override
  void initState() {
    /// default values to use in displaying

    if(isEmail(widget.userEmail!) == false){
      _email = "example@gmail.com";
    }else if(widget.userEmail == null){
      _email = "example@gmail.com";
    }else{
      _email = widget.userEmail;
    }
    _gravatar = Gravatar(_email!);

    super.initState();

  }

  bool isEmail(String em) {

    String p = r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = new RegExp(p);

    return regExp.hasMatch(em);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('User Profile'),
        centerTitle: true,
        backgroundColor: Color(0xFF4294A2),
        elevation: 0.0,
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(30, 40, 30, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (_gravatar != null)
              Center(
                child: CircleAvatar( // can add link to users profile pictures for this
                  backgroundImage: NetworkImage(_gravatar!.imageUrl()),
                  radius: 60,
                ),
              ),
            Divider(
              height: 60.0,
              color: Colors.grey[800],
            ),
            Text('Username',
                style: TextStyle(
                  color: Color(0xFF5B5B5B),
                  letterSpacing: 2.0,
                )),
            SizedBox(height: 10),
            Text('${widget.userName}',
                style: TextStyle(
                    color: Color(0xFF4395A1),
                    letterSpacing: 2.0,
                    fontSize: 28.0,
                    fontWeight: FontWeight.bold)),
            SizedBox(height: 30),
            Text(
                'Full Name',
                style: TextStyle(
                  color: Color(0xFF5B5B5B),
                  letterSpacing: 2.0,
                )
            ),
            Text(
                '${widget.fullName}',
                style: TextStyle(
                  color: Color(0xFF4395A1),
                  letterSpacing: 2.0,
                  fontSize: 28.0,

                )
            ),
            SizedBox(height: 30),

            Text(
                'Total Runs',
                style: TextStyle(
                  color: Color(0xFF5B5B5B),
                  letterSpacing: 2.0,
                )
            ),
            SizedBox(height: 10),
            Text(
                '${widget.totalRun}',
                style: TextStyle(
                  color: Color(0xFF4395A1),
                  letterSpacing: 2.0,
                  fontSize: 28.0,

                )
            ),
            SizedBox(height: 30),
            Text(
                'Total Distance',
                style: TextStyle(
                  color: Color(0xFF5B5B5B),
                  letterSpacing: 2.0,
                )
            ),
            SizedBox(height: 10),
            if(widget.totalDistance! < .01)
              Text('0.0',style: TextStyle(
                color: Color(0xFF4395A1),
                letterSpacing: 2.0,
                fontSize: 28.0,

              ) )
              else
              Text(
                widget.totalDistance!.toStringAsFixed(4),
                style: TextStyle(
                  color: Color(0xFF4395A1),
                  letterSpacing: 2.0,
                  fontSize: 28.0,

                )
            ),
            SizedBox(height: 30),
            Text(
                'Total Time',
                style: TextStyle(
                  color: Color(0xFF5B5B5B),
                  letterSpacing: 2.0,
                )
            ),
            SizedBox(height: 10),
            Text(
                '${widget.totalTime}',
                style: TextStyle(
                  color: Color(0xFF4395A1),
                  letterSpacing: 2.0,
                  fontSize: 28.0,

                )
            ),

            SizedBox(height: 30),
            FittedBox(
              fit: BoxFit.fitWidth,
              child: Row(
                children: [
                  Text('${widget.userEmail}',
                      style: TextStyle(
                        color: Color(0xFF4395A1),
                        fontSize: 18,
                        letterSpacing: 1.0,
                      )),
                  Icon(
                    Icons.email,
                    color: Color(0xFF5B5B5B),
                  ),
                  SizedBox(width: 10.0),
                ],
              ),
            ),
            SizedBox(height: 30),
          ],
        ),
      ),
    );
  }
}
