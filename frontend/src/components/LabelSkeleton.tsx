import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const LabelSkeleton = () => {
  return (
    <Card>
      <Skeleton height={"50px"} />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default LabelSkeleton;
