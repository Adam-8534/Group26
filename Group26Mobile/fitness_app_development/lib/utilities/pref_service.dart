import 'package:shared_preferences/shared_preferences.dart';

class PrefService{

  static Future<String?> getProfileImage() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();

    return prefs.getString('profileImg');
  }

  static void setProfileImage(String filePath) async{
    SharedPreferences prefs = await SharedPreferences.getInstance();

    await prefs.setString('profileImg', filePath);
  }
}