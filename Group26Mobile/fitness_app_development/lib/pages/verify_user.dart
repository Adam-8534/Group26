import 'package:fitness_app_development/pages/login_page.dart';
import 'package:fitness_app_development/pages/login_screen/login_screen.dart';
import 'package:fitness_app_development/utilities/asset_res.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:fitness_app_development/utilities/global_data.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

//working

class Verify extends StatefulWidget {
  @override
  _VerifyState createState() => _VerifyState();
}

class _VerifyState extends State<Verify> {
  final myController1 = TextEditingController();
  String email = '';
  int userId = -1;

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    myController1.dispose();
  }

  /*@override
  Widget build(BuildContext context) {
    return Scaffold(

        body: Stack(
          children: [
            Container(
              height: double.infinity,
              width: double.infinity,
              decoration: BoxDecoration(
                  image: const DecorationImage(
                    image: NetworkImage('https://www.verywellfit.com/thmb/LeBe7RNtzbJwyKRmH8ditmJ1NKg=/1500x1020/filters:no_upscale():max_bytes(150000):strip_icc()/Snapwire-Running-27-66babd0b2be44d9595f99d03fd5827fd.jpg'),
                    fit: BoxFit.cover,
                  ),
                  border: Border.all(
                    color: Colors.blue,
                    width: 8,
                  )
              ),
            ),
            Container(
              child: SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(),
                padding: EdgeInsets.symmetric(vertical: 80.0, horizontal: 40.0),

                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      'Fitness APP',
                      style: TextStyle(

                      ),
                    ),
                    Text(
                      'Verify User',
                      style: TextStyle(

                      ),
                    ),
                    SizedBox(height: 200),

                    Text(
                      'Please enter the pin code that was sent to email@email.com',
                      style: TextStyle(

                      ),
                    ),
                    TextField(
                      controller: myController1,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'PIN',
                      ),
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () async {

                        String pin = myController1.text;
                        GetAPI.verify(pin);
                        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                      },
                      child: Text('Enter'),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: Text('Cancel'),
                    ),

                  ],
                ),
              ),

            ),
          ],
        )
    );

  }*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          Container(
            height: Get.height,
            width: Get.width,
          ),
          Positioned(
            top: 0,
            left: 0,
            child: Stack(
              alignment: AlignmentDirectional(0, 0),
              children: [
                Container(
                  height: Get.height / 4,
                  width: Get.width,
                  child: ClipRRect(
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(25),
                      bottomRight: Radius.circular(25),
                    ),
                    child: Image.asset(
                      AssetRes.backGroundImage,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Text(
                  "Free Runner",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontFamily: "Constantia",
                      fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),
          SingleChildScrollView(
            child: Container(
              margin:
                  EdgeInsets.only(top: Get.height / 4.8, left: 20, right: 20),
              padding: EdgeInsets.symmetric(horizontal: 30),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(35),
                boxShadow: [
                  BoxShadow(
                    color: Color(0xFF4695A2).withOpacity(0.5),
                    offset: Offset(0, 0),
                    blurRadius: 5,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(height: 80),
                  Center(
                    child: Text(
                      "Verify User",
                      style: TextStyle(
                          color: Color(0xFF4695A2),
                          fontSize: 31,
                          fontWeight: FontWeight.w600),
                    ),
                  ),
                  SizedBox(height: 80),
                  Container(
                    padding: EdgeInsets.only(left: 15),
                    width: Get.width / 1.7,
                    child: Text(
                      "Please, enter the pin code that was sent to ${GlobalData.email}",
                      style: TextStyle(color: Color(0xFF5B5B5B), fontSize: 13),
                    ),
                  ),
                  SizedBox(height: 10),
                  Container(
                    height: 55,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(50),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.5),
                            offset: Offset(0, 0),
                            blurRadius: 3,
                          ),
                        ]),
                    child: Center(
                      child: TextField(
                        controller: myController1,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.only(left: 20),
                            hintText: "PIN",
                            hintStyle: TextStyle(color: Color(0xFF4695A2))),
                      ),
                    ),
                  ),
                  SizedBox(height: 40),
                  Center(
                    child: InkWell(
                      onTap: () async {
                        String pin = myController1.text;
                        GetAPI.verify(pin);
                        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                      },
                      child: Container(
                        height: 45,
                        width: 120,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(50),
                          gradient: LinearGradient(colors: [
                            Color(0xFF4297FE),
                            Color(0xFF76DDFF),
                          ]),
                        ),
                        child: Center(
                          child: Text(
                            "Enter",
                            style: TextStyle(color: Colors.white, fontSize: 15),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Center(
                    child: InkWell(
                      onTap: (){
                        Navigator.pop(context);
                      },
                      child: Container(
                        padding: EdgeInsets.all(10),
                        child: Text(
                          "Cancel",
                          style: TextStyle(color: Color(0xFF4297FE), fontSize: 14),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: (Get.height / 3.7)),
                ],
              ),
            ),
          ),
          Positioned(
            top: 50,
            left: 15,
            child: InkWell(
              onTap: () {
                Get.back();
              },
              child: Container(
                padding: EdgeInsets.all(10),
                child: Icon(
                  Icons.arrow_back,
                  color: Colors.white,
                  size: 27,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
