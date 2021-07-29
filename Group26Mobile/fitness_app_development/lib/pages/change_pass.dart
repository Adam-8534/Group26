import 'package:fitness_app_development/pages/home_page/home_screen.dart';
import 'package:fitness_app_development/pages/settings.dart';
import 'package:fitness_app_development/utilities/asset_res.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:fitness_app_development/utilities/get_lb_data.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'home_page2.dart';


////WORK IN PROGRESS

class ChangePass extends StatefulWidget {
  const ChangePass({Key? key}) : super(key: key);

  @override
  _ChangePassState createState() => _ChangePassState();
}

class _ChangePassState extends State<ChangePass> {
  final oldPassController = TextEditingController();
  final newPassController = TextEditingController();


  @override
  void dispose(){ // dispose controller when page is disposed
    oldPassController.dispose();
    newPassController.dispose();
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
                  SizedBox(height: 80),
                  Text(
                    "Edit Password",
                    style: TextStyle(
                        color: Color(0xFF4695A2),
                        fontSize: 31,
                        fontWeight: FontWeight.w600),
                  ),
                  SizedBox(height: 80),
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
                        controller: oldPassController,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.only(left: 20),
                            hintText: "Enter old password",
                            hintStyle: TextStyle(color: Color(0xFF4695A2))),
                      ),
                    ),
                  ),
                  SizedBox(height: 30),
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
                        controller: newPassController,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.only(left: 20),
                            hintText: "Enter new password",
                            hintStyle: TextStyle(color: Color(0xFF4695A2))),
                      ),
                    ),
                  ),
                  SizedBox(height: 40),
                  InkWell(
                    onTap: () async {
                      String oldPass = oldPassController.text;
                      String newPass = newPassController.text;
                      if(oldPass != "" && newPass != ""){
                        await GetAPI.editPassword(oldPass, newPass);
                        await Leaderboard.getTotalData();
                        await Leaderboard.getRunData();
                        await Leaderboard.getLeaderboardData();
                        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => HomeScreen()));
                      }
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
                          "Change",
                          style: TextStyle(color: Colors.white,fontSize: 15),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: (Get.height/4)),
                ],
              ),
            ),
          ),
          Positioned(
            top: 50,
            left: 15,
            child: InkWell(
              onTap: (){
                Get.back();
              },
              child: Container(
                padding: EdgeInsets.all(10),
                child: Icon(Icons.arrow_back,color: Colors.white,size: 27,),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
