import 'dart:convert';

import 'package:fitness_app_development/main.dart';
import 'package:fitness_app_development/pages/home_page2.dart';
import 'package:fitness_app_development/pages/login_screen/login_screen.dart';
import 'package:fitness_app_development/pages/pass_reset/forgot_password.dart';
import 'package:fitness_app_development/pages/register_page.dart';
import 'package:fitness_app_development/pages/register_screen/register_screen.dart';
import 'package:fitness_app_development/pages/verify_user.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:fitness_app_development/utilities/global_data.dart';
import 'package:fitness_app_development/utilities/results.dart';
import 'package:fitness_app_development/utilities/results_runs.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class RegisterScreenViewModel{
  RegisterScreenState? state;

  RegisterScreenViewModel(state){
    this.state = state;
  }

  TextEditingController userNameController = TextEditingController();
  TextEditingController pwdController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController firstNameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();

  FocusNode userNameFocus = FocusNode();
  FocusNode pwdFocus = FocusNode();
  FocusNode emailFocus = FocusNode();
  FocusNode firstNameFocus = FocusNode();
  FocusNode lastNameFocus = FocusNode();

  String email = '';
  String login = '';
  String password = '';
  String firstName = '';
  String lastName = '';



  late Map<String, dynamic> decodedToken;

  Future<void> onRegisterTap() async {
    email = emailController.text;
    login = userNameController.text;
    password = pwdController.text;
    firstName = firstNameController.text;
    lastName = lastNameController.text;



    try{
      int ret = await GetAPI.register(email, firstName, lastName, login, password);
      GlobalData.userName = login;
      GlobalData.lastName = lastName;
      GlobalData.firstName = firstName;
      GlobalData.email = email;
      if(ret == 200) {
        print('Register Successful');

      }
      else print('Error');

    }
    catch(e){
      print(e);
      return;
    }



    try {
      Get.to(() => Verify());
    }catch(e){
      print(e);
    }
  }

  void onCancelTap(){
    try {
      emailController.clear();
      userNameController.clear();
      pwdController.clear();
      firstNameController.clear();
      lastNameController.clear();
      Get.offAll(() => LoginScreen());
    }catch(e){
      print(e);
    }
  }


}