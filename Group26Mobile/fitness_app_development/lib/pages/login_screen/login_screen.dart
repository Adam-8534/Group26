import 'package:fitness_app_development/pages/login_screen/login_screen_view_model.dart';
import 'package:fitness_app_development/pages/login_screen/widgets/login_field_box.dart';
import 'package:fitness_app_development/utilities/asset_res.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginScreen extends StatefulWidget {
  @override
  LoginScreenState createState() => LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  LoginScreenViewModel? model;

  @override
  void initState() {
    model = LoginScreenViewModel(this);
    super.initState();
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
            child: LoginFieldBox(
              nameController: model!.nameController,
              nameFocus: model!.nameFocus,
              pwdController: model!.pwdController,
              pwdFocus: model!.pwdFocus,
              forgotPwdTap: model!.onForgotPwdTap,
              loginTap: model!.onLoginTap,
              registerTap: model!.onRegisterTap,
            ),
          ),
        ],
      ),
    );
  }
}
