import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import Header from "../components/Shared/Header";
import Layout from "../components/Shared/Layout";
import Loader from "../components/Shared/Loader";
import Book from "../components/Shared/Book";
import BooksContainer from "../components/Shared/BooksContainer";
import BooksContainerInner from "../components/Home/BooksContainerInner";
import SectionTitle from "../components/Home/SectionTitle";

export default function Home({ user, loading, setLoading }) {
  const [books, setBooks] = useState([]);
  const [booksToRead, setBooksToRead] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [booksRead, setBooksRead] = useState([]);

  useEffect(() => {
    if (user) {
      getBooklist();
    }
  }, [user]);

  async function getBooklist() {
    setLoading(true);
    const { data: books, error } = await supabase
      .from("books")
      .select()
      .eq("owner", user.id);

    if (error) {
      console.log(error);
    }

    setBooks(books);
    const booksToRead = books.filter((book) => book.status === "to-read");
    const booksReading = books.filter((book) => book.status === "reading");
    const booksRead = books.filter((book) => book.status === "read");
    setBooksToRead(booksToRead);
    setBooksReading(booksReading);
    setBooksRead(booksRead);
    setLoading(false);
  }

  return (
    <>
      <Header user={user} />
      <Layout>
        {user ? (
          <>
            {loading ? (
              <Loader />
            ) : (
              <>
                {books.length === 0 ? (
                  <div className="absolute bottom-7 right-0 left-0 lg:bottom-auto flex justify-center">
                    <Link
                      to={"/search"}
                      className="w-fit h-fit text-sm border border-neutral-200 hover:border-neutral-300 rounded-md px-5 py-2 hover:cursor-pointer"
                    >
                      Add your first book
                    </Link>
                  </div>
                ) : (
                  <div>
                    {booksReading.length > 0 ? (
                      <>
                        <SectionTitle
                          title="Reading"
                          description="Books I'm currently reading."
                          link="/reading"
                        />
                        <BooksContainerInner>
                          {booksReading.map((book) => (
                            <Book
                              key={book.id}
                              to={`/book/${book.id}`}
                              book={book}
                            />
                          ))}
                        </BooksContainerInner>
                      </>
                    ) : null}

                    {booksToRead.length > 0 ? (
                      <>
                        <SectionTitle
                          title="To Read"
                          description="Books to read in the future."
                          link="/to-read"
                        />
                        <BooksContainerInner>
                          {booksToRead.map((book) => (
                            <Book
                              key={book.id}
                              to={`/book/${book.id}`}
                              book={book}
                            />
                          ))}
                        </BooksContainerInner>
                      </>
                    ) : null}

                    {booksRead.length > 0 ? (
                      <>
                        <SectionTitle
                          title="Read"
                          description="The last books I've read."
                          link="/read"
                        />
                        <BooksContainerInner>
                          {booksRead
                            .map((book) => {
                              if (book.finished) {
                                return {
                                  ...book,
                                  finishedDate: new Date(book.finished),
                                };
                              }
                              return book;
                            })
                            .sort((a, b) => {
                              if (a.finishedDate && b.finishedDate) {
                                return b.finishedDate - a.finishedDate;
                              }
                              return 0;
                            })
                            .map((book) => (
                              <Book
                                key={book.id}
                                to={`/book/${book.id}`}
                                book={book}
                              />
                            ))}
                        </BooksContainerInner>
                      </>
                    ) : null}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="md:max-w-md mb-10 md:mt-10">
              <h1 className="text-4xl mb-2">
                Your <span className="italic">simple</span> and
                <br /> <span className="italic">personal</span> booklist
              </h1>
              <p className="text-sm text-neutral-400 mb-5">
                A very simple way to keep track of the books you read. No social
                media functions, no ads, no tracking. Just you and your books in
                a very clean interface. Forever{" "}
                <a
                  className="underline"
                  target="_blank"
                  href="https://github.com/matteotagliatti/bklst"
                >
                  open source
                </a>
                .
              </p>
              <a
                href="mailto:matteotagliatti@gmail.com?subject=Request to join Bklst&body=Hello, I'd love to join Bklst."
                className="text-sm flex items-center border border-neutral-200 hover:border-neutral-300 rounded-full px-2 py-1 w-fit gap-2"
                target="_blank"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.66667 6L8 8.33333L11.3333 6"
                    stroke="black"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.33333 11.3333V4.66667C1.33333 3.93029 1.93028 3.33334 2.66666 3.33334H13.3333C14.0697 3.33334 14.6667 3.93029 14.6667 4.66667V11.3333C14.6667 12.0697 14.0697 12.6667 13.3333 12.6667H2.66666C1.93028 12.6667 1.33333 12.0697 1.33333 11.3333Z"
                    stroke="black"
                    strokeWidth="1.2"
                  />
                </svg>
                Request an invite
              </a>
            </div>
            <BooksContainer>
              <Book
                link={false}
                book={{
                  title: "East of Eden",
                  author: "John Steinbeck",
                  img: "http://books.google.com/books/content?id=OPy6E5ZhXs0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                  status: "read",
                  finished: "2023-07-22",
                }}
              />
              <Book
                link={false}
                book={{
                  title: "Sapiens",
                  author: "Yuval Noah Harari",
                  img: "http://books.google.com/books/content?id=1EiJAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                  status: "reading",
                }}
              />
              <Book
                link={false}
                book={{
                  title: "Stories of Breece D'J Pancake",
                  author: "Breece D'J Pancake",
                  img: "http://books.google.com/books/content?id=jWs5AQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                  status: "to-read",
                }}
              />
              <Book
                link={false}
                book={{
                  title: "Slaughterhouse-Five",
                  author: "Kurt Vonnegut",
                  img: "http://books.google.com/books/content?id=DLCSm6whrnEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
                  status: "to-read",
                }}
              />
              <Book
                link={false}
                book={{
                  title: "Fellowship of the Ring",
                  author: "J.R.R. Tolkien",
                  img: "http://books.google.com/books/content?id=xFr92V2k3PIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                  status: "reading",
                }}
              />
              <Book
                link={false}
                book={{
                  title: "Fire & Blood",
                  author: "George R.R. Martin",
                  img: "http://books.google.com/books/content?id=Mj5XDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                  status: "read",
                  finished: "2023-03-21",
                }}
              />
            </BooksContainer>
          </>
        )}
      </Layout>
    </>
  );
}
