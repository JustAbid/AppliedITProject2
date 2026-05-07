# Scenario -1

Scenario: The Saturday Forest Clean-up

Objective: To find and register for a local environmental event within a limited weekend timeframe.

Actors: Eshwar (23-year-old MSc student in Germany).

Activities: It’s Friday morning, and Eshwar finishes his lectures early. He opens the "EcoConnect" app on his smartphone while walking to the U-Bahn station. He filters the map for "Tomorrow" and "Within 5km." He finds a "Forest Litter Clean-up" event scheduled for Saturday at 10:00 AM in a nearby park. He taps "Quick Register," and the app automatically pulls his name and university email to complete the form. He then clicks the "Sync to Calendar" button.

Problem / Gap: In the past, Eshwar would find these events on old bulletin boards or complex websites, but he often forgot the exact time or location because there was no way to save them. The existing manual systems don't provide real-time updates if the meeting point changes due to weather.

Resolution: The system solves this by sending Eshwar a push notification on Friday evening reminding him of the gear to bring (gloves/sturdy shoes). On Saturday morning, the app sends a final location pin directly to his navigation app, ensuring he arrives at the correct trailhead on time.


Reflection: Gap Identified 
Writing this scenario reveals a gap not previously considered: Real-time Navigation & Weather Alerts.
If the event is outdoors, the system needs to be integrated with a weather API and a GPS mapping service. If the weather is too dangerous for a forest clean-up, the system must have a way for organizers to "Push" an emergency cancellation or location change directly to registered users like Eshwar.

