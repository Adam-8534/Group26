
import 'package:fitness_app_development/pages/login_page.dart';
import 'package:fitness_app_development/pages/login_screen/login_screen.dart';
import 'package:fitness_app_development/pages/verify_user.dart';
import 'package:fitness_app_development/utilities/global_data.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:flutter/material.dart';

class Register extends StatefulWidget {

  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {

  final emailController = TextEditingController();
  final userNameController = TextEditingController();
  final passController = TextEditingController();
  final fnController = TextEditingController();
  final lnController = TextEditingController();

  String email = '';
  String login = '';
  String password = '';
  String firstName = '';
  String lastName = '';



  late Map<String, dynamic> decodedToken;


  @override
  void dispose(){
    emailController.dispose();
    userNameController.dispose();
    passController.dispose();
    fnController.dispose();
    lnController.dispose();
    super.dispose();
  }

  @override
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
                padding: EdgeInsets.symmetric(vertical: (MediaQuery.of(context).size.height) * .2, horizontal: (MediaQuery.of(context).size.width) * .1),

                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      'Register',
                      style: TextStyle(
                        fontSize: 30.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue[800],
                      ),
                    ),

                    SizedBox(height: 30.0),
                    TextField(
                      controller: emailController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Email',
                      ),
                    ),
                    SizedBox(height: 15.0),
                    TextField(
                      controller: userNameController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Username',

                      ),
                    ),

                    SizedBox(height: 15.0),
                    TextField(
                      controller: passController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Password',
                      ),
                    ),
                    SizedBox(height: 15.0),
                    TextField(
                      controller: fnController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'First Name',
                      ),
                    ),
                    SizedBox(height: 15.0),
                    TextField(
                      controller: lnController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Last Name',
                      ),
                    ),
                    SizedBox(height: 15.0),

                    SizedBox(height: 20.0),
                    Row(
                      children: [
                        ElevatedButton(

                          onPressed: () async {

                            email = emailController.text;
                            login = userNameController.text;
                            password = passController.text;
                            firstName = fnController.text;
                            lastName = lnController.text;



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
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Verify()));
                            }catch(e){
                              print(e);
                            }

                          },
                          child: Text('Register'),
                        ),
                        TextButton(

                          onPressed: () {

                            try {
                              emailController.clear();
                              userNameController.clear();
                              passController.clear();
                              fnController.clear();
                              lnController.clear();
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                            }catch(e){
                              print(e);
                            }

                          },
                          child: Text('Cancel'),
                        ),
                      ],
                    ),



                  ],
                ),
              ),

            ),
          ],
        )
    );
  }

}
