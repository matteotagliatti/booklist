export default function SearchView({ searchedBooks }) {
  return (
    <section>
      <h2 className="text-neutral900 font-medium mb-1">Searched books</h2>
      <div className="grid grid-cols-3 gap-2">
        {searchedBooks.map((book) => {
          return (
            <div
              className="bg-neutral-100 rounded p-2 hover:shadow-lg hover:cursor-pointer transition-all duration-100"
              key={book.id}
            >
              <p>{book.volumeInfo.title}</p>
              <p>{book.volumeInfo.authors[0]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
