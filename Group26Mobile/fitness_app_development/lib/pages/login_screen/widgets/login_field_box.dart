import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginFieldBox extends StatelessWidget {
  late TextEditingController nameController;
  late TextEditingController pwdController;

  late FocusNode nameFocus;
  late FocusNode pwdFocus;

  late VoidCallback forgotPwdTap;
  late VoidCallback loginTap;
  late VoidCallback registerTap;
  var ret;
  LoginFieldBox({
    required this.nameFocus,
    required this.nameController,
    required this.pwdController,
    required this.pwdFocus,
    required this.forgotPwdTap,
    required this.loginTap,
    required this.registerTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
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
            "Login",
            style: TextStyle(
                color: Color(0xFF4695A2),
                fontSize: 33,
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
                focusNode: nameFocus,
                controller: nameController,
                decoration: InputDecoration(
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.only(left: 20),
                    hintText: "username",
                    hintStyle: TextStyle(color: Color(0xFF4695A2))),
              ),
            ),
          ),
          SizedBox(height: 40),
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
                obscureText: true,
                focusNode: pwdFocus,
                controller: pwdController,
                decoration: InputDecoration(
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.only(left: 20),
                    hintText: "password",
                    hintStyle: TextStyle(color: Color(0xFF4695A2))),
              ),
            ),
          ),
          SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              InkWell(
                onTap: forgotPwdTap,
                child: Text(
                  "Forgot Password?",
                  style: TextStyle(
                    color: Color(0xFFFD0A08),
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              )
            ],
          ),
          if(ret == 'null')Text('Incorrect username or password, please try again.'),
          SizedBox(height: 40),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              InkWell(
                onTap: loginTap,
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
                      "Login",
                      style: TextStyle(color: Colors.white,fontSize: 15),
                    ),
                  ),
                ),
              ),
              InkWell(
                onTap: registerTap,
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
                      "Register",
                      style: TextStyle(color: Colors.white,fontSize: 15),
                    ),
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: (Get.height/5)),
        ],
      ),
    );
  }
}
