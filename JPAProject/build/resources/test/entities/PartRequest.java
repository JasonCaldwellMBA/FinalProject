package entities;

import java.util.Collection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class PartRequest {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@OneToOne
	@JoinColumn(name="request_id")
	private Request request;
	@OneToMany(mappedBy="partsRequest")
	private Collection<Part> parts;
	
	public Request getRequest() {
		return request;
	}
	public void setRequest(Request request) {
		this.request = request;
	}
	public Collection<Part> getParts() {
		return parts;
	}
	public void setParts(Collection<Part> parts) {
		this.parts = parts;
	}
	public int getId() {
		return id;
	}
}
