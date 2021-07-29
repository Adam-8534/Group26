
import 'package:fitness_app_development/pages/login_page.dart';
import 'package:fitness_app_development/pages/login_screen/login_screen.dart';
import 'package:fitness_app_development/pages/pass_reset/forgot_password_2.dart';
import 'package:fitness_app_development/utilities/asset_res.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';


//WORK IN PROGRESS

class Forgot extends StatefulWidget {

  @override
  _ForgotState createState() => _ForgotState();
}

class _ForgotState extends State<Forgot> {
  final emailController = TextEditingController();

  @override
  void dispose(){ // dispose controller when page is disposed
    emailController.dispose();
    super.dispose();
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
              alignment: AlignmentDirectional(0,0),
              children: [
                Container(
                  height: Get.height/4,
                  width: Get.width,
                  child: ClipRRect(
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(25),
                      bottomRight: Radius.circular(25),
                    ),
                    child: Image.asset(AssetRes.backGroundImage,fit: BoxFit.cover,),
                  ),
                ),
                Text("Free Runner",style: TextStyle(color: Colors.white,fontSize: 24,fontFamily: "Constantia",fontWeight: FontWeight.w500),),
              ],
            ),
          ),
          //Text("Free Runner",style: TextStyle(color: Colors.white,fontSize: 24,fontFamily: "Constantia",fontWeight: FontWeight.w500),),
          SingleChildScrollView(
            child: Container(
              margin: EdgeInsets.only(top: Get.height / 4.8, left: 20, right: 20),
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
                  SizedBox(height: 90),
                  Text(
                    "Password\nRecovery",
                    style: TextStyle(
                        color: Color(0xFF4695A2),
                        fontSize: 31,
                        fontWeight: FontWeight.w600),
                  ),
                  SizedBox(height: 100),
                  Row(
                    children: [
                      Container(
                        width: Get.width/1.7,
                        child: Text(
                          "Please enter the email associated with your account",
                          style: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                              fontSize: 12,
                              fontWeight: FontWeight.w600),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 12),
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
                        controller: emailController,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.only(left: 20),
                            hintText: "Email Address",
                            hintStyle: TextStyle(color: Color(0xFF4695A2))),
                      ),
                    ),
                  ),
                  SizedBox(height: 60),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      InkWell(
                        onTap: (){
                          String email = emailController.text;
                          GetAPI.sendPasswordEmail(email);
                          Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Forgot2()));
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
                              "Reset",
                              style: TextStyle(color: Colors.white,fontSize: 15),
                            ),
                          ),
                        ),
                      ),
                      InkWell(
                        onTap: (){
                          Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                        },
                        child: Container(
                          height: 45,
                          width: 120,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(50),
                            color: Colors.white,
                          ),
                          child: Center(
                            child: Text(
                              "Cancel",
                              style: TextStyle(color: Color(0xFF7AB2BB),fontSize: 15),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: (Get.height/4.6)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
