class Coords {
  double lat;
  double long;

  Coords(this.lat, this.long);

  Map toJson() => {
    'latitude': lat,
    'longitude': long,
  };
}