import Debug "mo:base/Debug"

actor{
  var currentNumber = 300;
  currentNumber := 100;
  
  public func topUp(amount : Nat) {
    currentNumber += amount;
    Debug.print(debug_show(currentNumber));
  };

  public func withdraw(amount : Nat){
    currentNumber -= amount;
    Debug.print(debug_show(currentNumber));
  };

  // topUp();
}