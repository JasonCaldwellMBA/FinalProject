package entities;
//test
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name="first_name")
	private String firstName;
	@Column(name="last_name")
	private String lastName;
	@OneToOne
	@JoinColumn(name="contact_id")
	private Contact contact;
	@OneToOne
	@JoinColumn(name="rating_id")
	private Rating rating;
	@Column(name="is_admin")
	private boolean admin; 
	private String userName;
	@OneToMany(mappedBy="user")
	private List<Vehicle> vehicle; 
	@OneToMany(mappedBy="user")
	private List<Request> requests;
	@Transient
	List<Business> associatedBusinesses;
	
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Contact getContact() {
		return contact;
	}
	public void setContact(Contact contact) {
		this.contact = contact;
	}
	public Rating getRating() {
		return rating;
	}
	public void setRating(Rating rating) {
		this.rating = rating;
	}
	public boolean isPrivilege() {
		return admin;
	}
	public void setPrivilege(boolean admin) {
		this.admin = admin;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public List<Business> getAssociatedBusinesses() {
		return associatedBusinesses;
	}
	public void setAssociatedBusinesses(List<Business> associatedBusinesses) {
		this.associatedBusinesses = associatedBusinesses;
	}
	public int getId() {
		return id;
	}
}
