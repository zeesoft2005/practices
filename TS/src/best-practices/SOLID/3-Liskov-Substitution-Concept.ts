/**
 * MAIN IDEA: "A subclass must enhance a base class functionality, but not reduce them"
 * 
 * PRINCIPLE:
 * It states that if a program or module is using base class then derived class should be able to extend 
 * their base class without changing their original implementation. For example, if a class, throws an exception in 
 * an interface method (becaue it's not valid/required ofr that class), then this is violating LSP
 * because in this way we are changing the correctness of the system
 */