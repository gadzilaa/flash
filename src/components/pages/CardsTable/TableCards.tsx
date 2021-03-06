import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Rating, TableSortLabel} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {CardType} from '../../../api/cards-api';
import {
    deleteCard,
    OrderType,
    setSortCards,
    updateCard
} from '../../../bll/reducers/cards-reducer';
import {useAppDispatch} from '../../../bll/store';

type TablePackPropsType = {
    cards: CardType[]
    sortCards: string
    order: OrderType
}

export const TableCards: React.FC<TablePackPropsType> = ({cards, order, sortCards}) => {
    const dispatch = useAppDispatch()

    const rows = cards.map(el => createData(
        el.question,
        el.answer,
        new Date(el.updated).toLocaleString(),
        el.grade,
        el._id,
        el.cardsPack_id,
        el.user_id))

    const onClickSortByHandler = (sortCard: string) => () => {
        dispatch(setSortCards(sortCard))
    }
    const removeCardHandler = (id: string) => {
        dispatch(deleteCard(id))
    }
    const updateCardHandler = (id: string) => {
        dispatch(updateCard(id))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={styleTHead}>
                        <TableRow sx={styleAlignCell}>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'question'}
                                    direction={sortCards === 'question' ? order : 'asc'}
                                    onClick={onClickSortByHandler('question')}
                                >Question</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'answer'}
                                    direction={sortCards === 'answer' ? order : 'asc'}
                                    onClick={onClickSortByHandler('answer')}
                                >Answer</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'updated'}
                                    direction={sortCards === 'updated' ? order : 'asc'}
                                    onClick={onClickSortByHandler('updated')}
                                >Last Updated</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'grade'}
                                    direction={sortCards === 'grade' ? order : 'asc'}
                                    onClick={onClickSortByHandler('grade')}
                                >Grade</TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.cardID}
                                sx={[styleTd, styleAlignCell]}
                            >
                                <TableCell>
                                    <Button variant={'contained'}
                                            color={'error'}
                                            sx={{textTransform: 'none'}}
                                            onClick={() => removeCardHandler(row.cardID)}
                                    >Delete card</Button>
                                    <Button variant={'contained'}
                                            sx={{textTransform: 'none'}}
                                            onClick={() => updateCardHandler(row.cardID)}
                                    >Edit</Button> {row.question}</TableCell>
                                <TableCell>{row.answer}</TableCell>
                                <TableCell>{row.updatedDate}</TableCell>
                                <TableCell>
                                    <Rating
                                        name="simple-controlled"
                                        value={row.grade}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{opacity: 0.55}}
                                                             fontSize="inherit"/>}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

// style
const styleTHead = {
    background: '#33b198',
    'th': {color: '#fff', fontWeight: 'bold'},
    'th: nth-of-type(4)': {width: '158px'}
}
const styleTd = {
    '&:last-child td, &:last-child th': {border: 0},
    '&:nth-of-type(even)': {background: ' #F8F7FD'}
}
const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}
const styleActiveLabel = {
    color: '#fff !important',
    '& svg': {color: '#fff !important'}
}

// type
interface Data {
    question: string;
    answer: string;
    updatedDate: string;
    grade: number;
    cardID: string;
    cardsPackID: string;
    cardsPackOwnerID: string
}

function createData(
    question: string,
    answer: string,
    updatedDate: string,
    grade: number,
    cardID: string,
    cardsPackID: string,
    cardsPackOwnerID: string
): Data {
    return {question, answer, updatedDate, grade, cardID, cardsPackID, cardsPackOwnerID};
}