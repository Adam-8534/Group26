import 'package:fitness_app_development/pages/register_screen/register_screen_view_model.dart';
import 'package:fitness_app_development/pages/register_screen/widgets/register_field_box.dart';
import 'package:fitness_app_development/utilities/asset_res.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RegisterScreen extends StatefulWidget {
  @override
  RegisterScreenState createState() => RegisterScreenState();
}

class RegisterScreenState extends State<RegisterScreen> {
  RegisterScreenViewModel? model;

  @override
  void initState() {
    model = RegisterScreenViewModel(this);
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
                      fontSize: 30,
                      fontFamily: "Constantia",
                      fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),
          //Text("Free Runner",style: TextStyle(color: Colors.white,fontSize: 24,fontFamily: "Constantia",fontWeight: FontWeight.w500),),
          SingleChildScrollView(
            child: RegisterFieldBox(
              registerTap: model!.onRegisterTap,
              pwdFocus: model!.pwdFocus,
              pwdController: model!.pwdController,
              cancelTap: model!.onCancelTap,
              emailController: model!.emailController,
              emailFocus: model!.emailFocus,
              firstNameController: model!.firstNameController,
              firstNameFocus: model!.firstNameFocus,
              lastNameController: model!.lastNameController,
              lastNameFocus: model!.lastNameFocus,
              userNameController: model!.userNameController,
              userNameFocus: model!.userNameFocus,
            ),
          ),
        ],
      ),
    );
  }
}
