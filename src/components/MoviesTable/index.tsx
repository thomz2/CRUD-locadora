import React, { useState, useEffect, useRef } from "react";
import { movieGetType } from "../../interfaces/movieInterface";
import BotaoDD from "../../commons/BotaoDD";
import { deleteMoviesAction } from "../../services/actions/movieAction";
import MovieCard from "../MovieCard";
import { motion } from 'framer-motion'

import './style.css'

interface IProps {
    movies: movieGetType[];
};

const MoviesTable: React.FC<IProps> = ({ movies }) => {

    const carousel = useRef<any>();
    const [largura, setLargura] = useState<number>(0);

    useEffect(() => {
        console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)   
        setLargura(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
    }, [carousel.current]);

    return (
        <div className="pai">

            <motion.div ref={carousel} className="carousel" whileTap={{ cursor: "grabbing" }}>
                <motion.div 
                className="inner"
                drag="x"
                dragConstraints= {{ right: 0, left: -largura }}
                initial={{ x: 100 }}
                animate={{ x: 0}}
                transition={{ duration: 0.8 }}
                >
                    {movies.map(filme => (
                        <motion.div className="item"> 
                            <MovieCard filme={filme}/>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

        </div>
    )

}

export default MoviesTable;