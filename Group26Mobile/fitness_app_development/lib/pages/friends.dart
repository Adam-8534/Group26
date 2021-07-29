import 'dart:async';

import 'package:fitness_app_development/friends_util/search_friend_response.dart';
import 'package:fitness_app_development/friends_util/searchBar.dart';
import 'package:fitness_app_development/friends_util/friends_provider.dart';
import 'package:fitness_app_development/pages/home_page/home_screen.dart';
import 'package:fitness_app_development/pages/profile_page.dart';
import 'package:fitness_app_development/pages/run_sequence/start_run.dart';
import 'package:fitness_app_development/pages/user_profile.dart';
import 'package:fitness_app_development/pages/users_page.dart';
import 'package:fitness_app_development/utilities/get_api.dart';
import 'package:fitness_app_development/utilities/get_lb_data.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'home_page2.dart';

class FriendsScreen extends StatefulWidget {
  const FriendsScreen({Key? key}) : super(key: key);

  @override
  _FriendsScreenState createState() => _FriendsScreenState();
}

class _FriendsScreenState extends State<FriendsScreen> {
  Timer? timeHandle;
  Future<List<Result>>? list;
  var viewModel = MainViewModel();

  void textChanged(String val) {
    if (timeHandle != null) {
      timeHandle?.cancel();
    }
    timeHandle = Timer(Duration(milliseconds: 10000), () {
      print("Calling now the API: $val");
      viewModel.searchFriendApi(val);
    });
  }

  @override
  void initState() {
    //final mainViewModel = Provider.of<MainViewModel>(co, listen: false);
    viewModel.searchFriendApi('');
    super.initState();
  }

  @override
  void dispose() {
    // dispose controller when page is disposed
    viewModel.dispose();
    super.dispose();
  }

  getUsers(String value) async {
    print("Calling now the API get user: $value");

    //SearchFriendResponse response = await viewModel.searchFriendApi(value);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0.0,
        title: Text("Friends Page"),
        centerTitle: true,
        backgroundColor: Color(0xFF4294A2),
        leading: new IconButton(
          onPressed: () async {
            await Leaderboard.getTotalData();
            await Leaderboard.getRunData();
            await Leaderboard.getLeaderboardData();
            Navigator.of(context).popUntil((route) => route.isFirst);
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => HomeScreen()));
          },
          icon: new Icon(Icons.arrow_back, color: Colors.black),
        ),
      ),
      body: ChangeNotifierProvider(
        create: (_) => viewModel,
        child: Container(
            height: double.infinity,
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.white,
            ),
            child: Column(
              children: [
                SizedBox(
                  height: 20,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 18.0, right: 18),
                  child: SearchBar(
                    hintText: 'Search Friends',
                    onChangeTextForSearch: (String val) {
                      print("value : $val");
                      if (val.isEmpty) {
                        viewModel.searchFriendApi('');
                      }
//                        if(val.length>0){
//                          textChanged(val);
//                        }else{
//                          print("is empty");
//                          viewModel.searchFriendApi('');
//
//                        }
                    },
                    onTextReadyForSearch: (String value) {
                      viewModel.searchFriendApi(value);
                    },
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Consumer<MainViewModel>(
                  builder: (_, viewModel, __) => FutureBuilder<List<Result>>(
                      future: viewModel.list,
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.done) {
                          if (snapshot.hasError) {
                            return Expanded(
                              child: Text("${snapshot.error}",
                                  style: TextStyle(color: Colors.red)),
                            );
                          } else if (snapshot.hasData) {
                            print("data length L ${snapshot.data!.length}");
                            return Expanded(
                              child: ListView.builder(
                                  shrinkWrap: true,
                                  physics: AlwaysScrollableScrollPhysics(),
                                  itemCount: snapshot.data!.length,
                                  itemBuilder: (BuildContext bc, int index) {
                                    return Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Expanded(
                                            child: Container(
                                          width: double.infinity,
                                          height: 50,
                                          child: Padding(
                                            padding: const EdgeInsets.only(
                                                left: 18.0,
                                                right: 10.0,
                                                bottom: 10),
                                            child: Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.center,
                                              children: [
                                                Expanded(
                                                  child: Container(
                                                    height: 50,
                                                    margin: EdgeInsets.only(
                                                        right: 20),
                                                    decoration: BoxDecoration(
                                                      color: Color(0xFF4395A1),
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              50),
                                                    ),
                                                    child: Center(
                                                      child: Text(
                                                        '${snapshot.data![index].fullName}',
                                                        style: TextStyle(
                                                            color: Colors.white,
                                                            fontSize: 14),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                InkWell(
                                                  onTap: () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(
                                                            builder: (context) => ProfilePage(
                                                                userName: snapshot
                                                                    .data![
                                                                        index]
                                                                    .login,
                                                                userEmail:
                                                                    snapshot
                                                                        .data![
                                                                            index]
                                                                        .email,
                                                                fullName: snapshot
                                                                    .data![
                                                                index]
                                                                    .fullName,
                                                                totalTime: snapshot
                                                                    .data![
                                                                index]
                                                                    .totalTime,
                                                                totalDistance: snapshot
                                                                    .data![
                                                                index]
                                                                    .totalDistance,
                                                                totalRun: snapshot
                                                                    .data![
                                                                        index]
                                                                    .totalRuns)));
                                                  },
                                                  child: Container(
                                                    padding:
                                                        EdgeInsets.symmetric(
                                                            horizontal: 16,
                                                            vertical: 10),
                                                    decoration: BoxDecoration(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              50),
                                                      border: Border.all(
                                                        width: 2,
                                                        color:
                                                            Color(0xFF4395A1),
                                                      ),
                                                    ),
                                                    child: Text(
                                                      "Profiles",
                                                      style: TextStyle(
                                                          color:
                                                              Color(0xFF4395A1),
                                                          fontWeight:
                                                              FontWeight.bold),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        )),
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(right: 10),
                                          child: InkWell(
                                            onTap: () {
                                              showDialog(
                                                context: context,
                                                builder: (context) =>
                                                    AlertDialog(
                                                  title: Text("Confirmation!"),
                                                  content: Text(
                                                      "Are you sure you want to remove this friend?"),
                                                  actions: [
                                                    TextButton(
                                                      onPressed: () {
                                                        Navigator.pop(context);
                                                        GetAPI.removefriend(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .userId
                                                                    .toInt())
                                                            .then((value) {
                                                          viewModel.list!.then(
                                                              (value) => value
                                                                  .removeAt(
                                                                      index));
                                                          setState(() {});
                                                        });
                                                      },
                                                      child: Text(
                                                        'Yes',
                                                      ),
                                                    ),
                                                    TextButton(
                                                      onPressed: () {
                                                        Navigator.pop(context);
                                                      },
                                                      child: Text(
                                                        'No',
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              );
                                            },
                                            child: Container(
                                              padding: EdgeInsets.symmetric(
                                                  horizontal: 15, vertical: 10),
                                              decoration: BoxDecoration(
                                                borderRadius:
                                                    BorderRadius.circular(50),
                                                border: Border.all(
                                                  width: 2,
                                                  color: Color(0xFF4395A1),
                                                ),
                                              ),
                                              child: Text(
                                                "Remove",
                                                style: TextStyle(
                                                    color: Color(0xFF4395A1),
                                                    fontWeight:
                                                        FontWeight.bold),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    );
                                  }),
                            );
                          } else {
                            return Expanded(
                              child: Text(
                                "No results",
                                style: TextStyle(color: Colors.red),
                              ),
                            );
                          }
                        } else if (snapshot.connectionState ==
                            ConnectionState.none) {
                          return Expanded(child: Container());
                        } else {
                          return Expanded(
                            child: Center(
                                child: CircularProgressIndicator(
                              backgroundColor: Colors.red,
                            )),
                          );
                        }
                      }),
                ),
                SizedBox(
                  height: (MediaQuery.of(context).size.height) * .077,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.blue[200],
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        IconButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => HomeScreen()));
                          },
                          icon: Icon(Icons.home),
                          iconSize:
                              (MediaQuery.of(context).size.height) * .06,
                        ),
                        IconButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => UsersScreen()));
                          },
                          icon: Icon(Icons.search),
                          iconSize:
                              (MediaQuery.of(context).size.height) * .06,
                        ),
                        FloatingActionButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => StartRun()));
                          },
                          child: Icon(Icons.add),
                          backgroundColor: Colors.green,
                          elevation: 10,
                        ),
                        IconButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => FriendsScreen()));
                          },
                          icon: Icon(Icons.contact_page_rounded),
                          iconSize:
                              (MediaQuery.of(context).size.height) * .06,
                        ),
                        IconButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => User()));
                          },
                          icon: Icon(Icons.portrait_rounded),
                          iconSize:
                              (MediaQuery.of(context).size.height) * .06,
                        ),
                      ],
                    ),
                  ),
                )
              ],
            )),
      ),
    );
  }
}

class RowView extends StatelessWidget {
  String name;

  RowView(this.name, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 50,
      child: Padding(
        padding: const EdgeInsets.only(left: 18.0, right: 10.0, bottom: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              child: Container(
                height: 50,
                margin: EdgeInsets.only(right: 20),
                decoration: BoxDecoration(
                  color: Color(0xFF4395A1),
                  borderRadius: BorderRadius.circular(50),
                ),
                child: Center(
                  child: Text(
                    '$name',
                    style: TextStyle(color: Colors.white, fontSize: 14),
                  ),
                ),
              ),
            ),
            InkWell(
              onTap: () {},
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  border: Border.all(
                    width: 2,
                    color: Color(0xFF4395A1),
                  ),
                ),
                child: Text(
                  "Profiles",
                  style: TextStyle(
                      color: Color(0xFF4395A1), fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
