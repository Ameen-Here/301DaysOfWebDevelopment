import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float"




actor{
  stable var currentNumber: Float = 300;
  stable var startTime = Time.now();
  
  public func topUp(amount : Float) {
    currentNumber += amount;
    Debug.print(debug_show(currentNumber));
  };

  public func withdraw(amount : Float){
    let tempValue : Float = currentNumber - amount;
    if (tempValue > 0){
    currentNumber -= amount;
    Debug.print(debug_show(currentNumber));
    }else {
      Debug.print("Value must be lower, current value results in the value to be minus.");
      Debug.print(debug_show(startTime));
    }
    
  };

  public func compound(){
    let currentTime = Time.now();
    let timePassed = (currentTime - startTime)/1000000000;
    startTime := currentTime;
    currentNumber := currentNumber * (1.01)**Float.fromInt(timePassed);
    Debug.print(debug_show(currentNumber));

  };

  public query func checkBalance(): async Float {
    return currentNumber;
  };

  // topUp();
}