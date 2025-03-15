import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, Save, Trash2 } from 'lucide-react';

function App() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [eventText, setEventText] = useState<string>('');
  const [pastEvents, setPastEvents] = useState<Array<{ date: string; text: string }>>([]);

  // Get today's date and format it for the date input max value
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && eventText) {
      setPastEvents([...pastEvents, { date: selectedDate, text: eventText }]);
      setEventText('');
    }
  };

  const deleteEvent = (index: number) => {
    setPastEvents(pastEvents.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
              <Calendar className="w-12 h-12" />
              Past Planner™
            </h1>
            <p className="text-amber-700 text-lg italic">
              Because who doesn't want to plan what already happened?
            </p>
          </div>

          {/* Warning Banner */}
          <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg flex items-center gap-3">
            <AlertTriangle className="text-amber-500 w-6 h-6" />
            <p className="text-amber-700">
              Warning: This planner only works for the past. If you're trying to plan the future, 
              you're in the wrong timeline!
            </p>
          </div>

          {/* Past Event Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <div className="mb-4">
              <label className="block text-amber-800 font-medium mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Select a Date That Already Happened
              </label>
              <input
                type="date"
                max={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-amber-800 font-medium mb-2">
                What "Will" Happen on This Day?
              </label>
              <textarea
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Plan your past event here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 
                transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save to History
            </button>
          </form>

          {/* Past Events List */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Your Past Plans</h2>
            {pastEvents.length === 0 ? (
              <p className="text-amber-700 italic">
                No past events planned yet. Quick, start planning what already happened!
              </p>
            ) : (
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between bg-amber-50 p-4 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-amber-800">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-amber-700 mt-1">{event.text}</p>
                    </div>
                    <button
                      onClick={() => deleteEvent(index)}
                      className="text-amber-600 hover:text-amber-800 transition-colors"
                      aria-label="Delete event"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;