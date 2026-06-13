import { Link, useParams } from 'react-router-dom';

function EventDetailsPage() {
  const { id } = useParams();

  const event = {
    id,
    title: 'Rev Battle 1.0',
    category: 'education',
    date: 'Sun, Jun 14',
    time: '11:00 AM',
    location: 'Elekahia Stadium, Port Harcourt',
    price: '₦5,000',
    organizer: {
      name: 'Jacob Salem',
      id: 'cmqarjccw0002l7055mcgb49j'
    },
    going: 8,
    interested: 1800,
    about: 'Get all the germans and American muscles in line. Let\'s roar!',
    ticketsLeft: 1000,
    ticketType: 'General',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 border-b border-gray-100">
        <Link to="/">
          <img src="https://bitbandy.com/_next/image?url=%2Fimages%2Fbitbandy.png&w=256&q=75" alt="Bitbandy" className="h-10" />
        </Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Image */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full aspect-video object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  VERIFIED
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{event.title}</h1>

              <div className="space-y-3 text-lg text-gray-700">
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.date}
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </p>
              </div>

              {/* Organizer */}
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Organised by</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <Link
                      to={`/organizers/${event.organizer.id}`}
                      className="text-purple-600 font-semibold text-lg hover:underline"
                    >
                      {event.organizer.name}
                    </Link>
                  </div>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/organizers/${event.organizer.id}`}
                    className="text-sm text-purple-600 font-medium hover:underline"
                  >
                    View profile →
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-12 pt-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{event.going}</p>
                  <p className="text-sm text-gray-500">going</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{event.interested / 1000}k</p>
                </div>
              </div>

              {/* About */}
              <div className="pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{event.about}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-purple-600 font-medium">#{event.category}</span>
                  <span className="text-purple-600 font-medium">#Port Harcourt</span>
                  <span className="text-purple-600 font-medium">#twintix</span>
                </div>
              </div>

              {/* Venue */}
              <div className="pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Venue</h2>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 text-lg">Elekahia Stadium</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Ticket Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Tickets from</p>
                <p className="text-4xl font-bold text-gray-900 mb-8">{event.price}</p>

                <h3 className="text-xl font-semibold text-gray-900 mb-6">Select Tickets</h3>

                <div className="mb-6 p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{event.ticketType}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-xl">{event.price}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-3 font-medium">Quantity</label>
                  <div className="flex items-center justify-between p-2 border border-gray-200 rounded-xl">
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-purple-500 hover:text-purple-600 transition font-semibold">
                      −
                    </button>
                    <span className="text-2xl font-bold text-gray-900">0</span>
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-purple-500 hover:text-purple-600 transition font-semibold">
                      +
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-6">Only {event.ticketsLeft} tickets left</p>

                <button className="w-full py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition text-lg">
                  Buy Tickets
                </button>
              </div>

              {/* Event Summary Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{event.title}</h2>
                <div className="space-y-4 text-gray-700 mb-6">
                  <p className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </p>
                  <p className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Organised by</p>
                  <Link
                    to={`/organizers/${event.organizer.id}`}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    {event.organizer.name}
                  </Link>
                </div>
                <div className="flex gap-12 pt-4">
                  <div>
                    <p className="text-xl font-bold text-gray-900">{event.going}</p>
                    <p className="text-sm text-gray-500">going</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{event.interested / 1000}k</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
