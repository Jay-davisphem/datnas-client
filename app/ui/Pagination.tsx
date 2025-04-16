import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const buttonVariants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: { scale: 1.05, opacity: 1 },
  active: { scale: 0.95 },
  disabled: { opacity: 0.5, pointerEvents: 'none' as 'none' },
};

const pageNumberVariants = {
  initial: { opacity: 0.8 },
  hover: { opacity: 1, scale: 1.1 },
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.div
      className="flex justify-center items-center gap-4 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="active"
        animate={currentPage === 1 ? 'disabled' : 'initial'}
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed"
      >
        Previous
      </motion.button>
      <motion.span
        variants={pageNumberVariants}
        initial="initial"
        whileHover="hover"
        className="select-none" // Prevent text selection on click/drag
      >
        {currentPage} of {totalPages}
      </motion.span>
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="active"
        animate={currentPage === totalPages ? 'disabled' : 'initial'}
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed"
      >
        Next
      </motion.button>
    </motion.div>
  );
};

export default Pagination;