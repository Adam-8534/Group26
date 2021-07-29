import 'package:fitness_app_development/pages/login_page.dart';
import 'package:fitness_app_development/pages/login_screen/login_screen.dart';
import 'package:fitness_app_development/utilities/asset_res.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../main.dart';

//WORK IN PROGRESS

class Forgot2 extends StatefulWidget {
  @override
  _Forgot2State createState() => _Forgot2State();
}

class _Forgot2State extends State<Forgot2> {
  final keyController = TextEditingController();
  final passController = TextEditingController();
  String email = '';

  void changeEmail() {
    setState(() async {
      email = (await storage.read(key: "email"))!;
    });
  }

  @override
  void dispose() {
    // dispose controller when page is disposed
    keyController.dispose();
    passController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    //changeEmail();
    //print(email);
  }

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
          //Text("Free Runner",style: TextStyle(color: Colors.white,fontSize: 24,fontFamily: "Constantia",fontWeight: FontWeight.w500),),
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
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(height: 80),
                  Text(
                    "Password Recovery",
                    style: TextStyle(
                        color: Color(0xFF4695A2),
                        fontSize: 30,
                        fontWeight: FontWeight.w600),
                  ),
                  SizedBox(height: 80),
                  Row(
                    children: [
                      SizedBox(width: 15),
                      Text(
                        "Please enter the key that was sent to",
                        style: TextStyle(color: Color(0xFF5B5B5B), fontSize: 13),
                      ),
                    ],
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
                        controller: keyController,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.only(left: 20),
                            hintText: "Key",
                            hintStyle: TextStyle(color: Color(0xFF4695A2))),
                      ),
                    ),
                  ),
                  SizedBox(height: 30),
                  Row(
                    children: [
                      SizedBox(width: 15),
                      Text(
                        "Please enter new password",
                        style: TextStyle(color: Color(0xFF5B5B5B), fontSize: 13),
                      ),
                    ],
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
                        controller: passController,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.only(left: 20),
                            hintText: "Password",
                            hintStyle: TextStyle(color: Color(0xFF4695A2))),
                      ),
                    ),
                  ),
                  SizedBox(height: 40),
                  InkWell(
                    onTap: () async {
                      String passkey = keyController.text;
                      String pass = passController.text;
                      var ret = GetAPI.passwordreset(passkey, pass);
                      print(ret);
                      Navigator.of(context).popUntil((route) => route.isFirst);
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
                          "Submit",
                          style: TextStyle(color: Colors.white, fontSize: 15),
                        ),
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: (){
                      Navigator.of(context).popUntil((route) => route.isFirst);
                      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                    },
                    child: Container(
                      padding: EdgeInsets.all(10),
                      child: Text("Cancel",style: TextStyle(color: Color(0xFF4297FE), fontSize: 14),),
                    ),
                  ),
                  SizedBox(height: (Get.height / 6)),
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
