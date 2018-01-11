package entities;

import java.util.List;

public class User {
	private int id;
	private String firstName;
	private String lastName;
	private Contact contact;
	private double rating;
	private boolean privilege; 
	private String userName;
	List<Business> associatedBusinesses;
}
