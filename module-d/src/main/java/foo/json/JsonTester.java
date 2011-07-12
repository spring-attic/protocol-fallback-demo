package foo.json;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;

public class JsonTester {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception{
		List<MenuItem> menuItems = new ArrayList<MenuItem>();
		
		MenuItem item = new MenuItem();
		item.setName("Plain Pizza");
		item.setPrice("5.48");
		menuItems.add(item);
		
		item = new MenuItem();
		item.setName("White Pizza");
		item.setPrice("25.48");
		menuItems.add(item);
		
		item = new MenuItem();
		item.setName("Primavera");
		item.setPrice("15.33");
		menuItems.add(item);
		
		MenuCategory category = new MenuCategory();
		category.setName("Specialty Pizza");
		category.setMenuItems(menuItems);
		
		List<MenuItem> menuItemsA = new ArrayList<MenuItem>();
		
		MenuItem itemA = new MenuItem();
		itemA.setName("The Original");
		itemA.setPrice("35.48");
		menuItemsA.add(itemA);
		
		MenuCategory categoryA = new MenuCategory();
		categoryA.setName("Tomato Pie");
		categoryA.setMenuItems(menuItemsA);
		
		List<MenuCategory> menu = new LinkedList<MenuCategory>();
		menu.add(category);
		menu.add(categoryA);
		
		
		ObjectMapper mapper = new ObjectMapper();
		StringWriter writer = new StringWriter();
		mapper.writeValue(writer, menu);
		System.out.println(writer.toString());
		
	}

}
