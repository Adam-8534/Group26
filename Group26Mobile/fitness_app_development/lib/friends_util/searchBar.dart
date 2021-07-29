import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SearchBar extends StatelessWidget {
  final Function(String)? onTextReadyForSearch;
  final Function(String)? onChangeTextForSearch;
  final String? hintText;

  final TextEditingController eCtrl = new TextEditingController();

  SearchBar(
      {Key? key,
      @required this.hintText,
      @required this.onTextReadyForSearch,
      @required this.onChangeTextForSearch})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Expanded(
          child: TextFormField(
            cursorColor: Colors.blue,
            decoration: InputDecoration(
              fillColor: Colors.white,
              filled: true,

              hintText: hintText,
              hintStyle: TextStyle(color: Colors.black26),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(50),
                borderSide: BorderSide(
                  color: Color(0xFF4395A1),
                  width: 10,
                ),
              ),
              //border: InputBorder.none,
              //focusedBorder: InputBorder.none,
            ),
            controller: eCtrl,
            onChanged: (text) {
              print("on text change $text");
              onChangeTextForSearch!(text);
            },
            onFieldSubmitted: (text) {
              onTextReadyForSearch!(text);
            },
          ),
        ),
      ],
    );
  }
}
